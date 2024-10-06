-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "Rack" TEXT NOT NULL,
    "DeviceType" TEXT NOT NULL,
    "MAC" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);
