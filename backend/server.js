const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
const port = 5000;

const prisma = new PrismaClient();

app.use(bodyParser.json());

// Route to create a new data entry in the database
app.post("/data", async (req, res) => {
  const { Rack, DeviceType, MAC, Location, Status } = req.body;

  // Validate required fields
  if (!Rack || !DeviceType || !MAC || !Location || !Status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newData = await prisma.inventory.create({
      data: {
        Rack,
        DeviceType,
        MAC,
        Location,
        Status,
      },
    });
    res.status(201).json({ message: "Data created successfully", newData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Existing route to get data by Rack
app.get("/data/rack/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.inventory.findMany({
      where: { Rack: id },
    });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all available racks (sorted in ascending order)
app.get("/racks", async (req, res) => {
  try {
    const racks = await prisma.inventory.findMany({
      select: {
        Rack: true,
      },
      distinct: ["Rack"],
    });
    const sorted = racks.sort(
      (a, b) =>
        parseInt(a.Rack.replace("Rack", "")) -
        parseInt(b.Rack.replace("Rack", ""))
    );
    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all data
app.get("/data/all", async (req, res) => {
  try {
    const { query } = req;
    const findQuery = {};

    if (query?.deviceType && query?.deviceType.length > 0) {
      if (findQuery.where === undefined) findQuery.where = {};
      findQuery.where.DeviceType = query.deviceType;
    }

    if (query?.status && query?.status.length > 0) {
      if (findQuery.where === undefined) findQuery.where = {};
      findQuery.where.Status = query.status;
    }

    const data = await prisma.inventory.findMany(findQuery);
    const sorted = data.sort(
      (a, b) =>
        parseInt(a.Rack.replace("Rack", "")) -
        parseInt(b.Rack.replace("Rack", ""))
    );
    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update the data
app.put("/data/:id", async (req, res) => {
  const { id } = req.params;
  const { Rack, DeviceType, MAC, Location, Status } = req.body;

  try {
    const updatedData = await prisma.inventory.update({
      where: { id },
      data: { Rack, DeviceType, MAC, Location, Status },
    });
    res.json(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete data
app.delete("/data/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.inventory.delete({
      where: { id },
    });
    res.json({ message: "Data deleted successfully", data });
  } catch (err) {
    if (err.code === "P2025") {
      res.status(404).json({ message: "Data not found" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Search by MAC address
app.get("/data", async (req, res) => {
  const { mac } = req.query;
  try {
    if (!mac) {
      return res.status(400).json({ message: "MAC address is required" });
    }

    const data = await prisma.inventory.findMany({
      where: {
        MAC: {
          contains: mac,
        },
      },
    });

    if (data.length > 0) {
      res.json(data);
    } else {
      res
        .status(404)
        .json({ message: "No data found for the provided MAC address" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get device counts by type (active/inactive)
app.get("/device-counts", async (req, res) => {
  try {
    const deviceTypes = [
      "APs",
      "BPD R3G",
      "BPD R3I",
      "BPD R3W",
      "Bridge",
      "controller",
      "eNIC",
      "eROTA",
      "FSU",
      "Gen4NICs",
      "Gen5NICs",
      "Genus DLMS/COSEM Meter",
      "meter",
      "meter - NIC",
      "meter - uAP",
      "NIC",
      "PVA",
      "Raspberry PI",
      "Relay",
      "Relay PI",
      "sAP",
      "SIM",
      "uAP",
      "Streetlight",
    ];
    let deviceCounts = {};

    for (const type of deviceTypes) {
      const activeCount = await prisma.inventory.count({
        where: {
          DeviceType: type,
          Status: "Active",
        },
      });

      const inactiveCount = await prisma.inventory.count({
        where: {
          DeviceType: type,
          Status: "Inactive",
        },
      });

      deviceCounts[type] = {
        active: activeCount,
        inactive: inactiveCount,
      };
    }

    res.json(deviceCounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to fetch devices by status (active/inactive)
app.get("/data/status/:deviceType/:statusType", async (req, res) => {
  const { deviceType, statusType } = req.params;
  try {
    const data = await prisma.inventory.findMany({
      where: {
        DeviceType: deviceType,
        Status: statusType.charAt(0).toUpperCase() + statusType.slice(1),
      },
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
