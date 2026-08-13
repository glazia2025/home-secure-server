import { HydratedDocument, Model, Schema, Types, model } from "mongoose";

export interface ISensor {
  hub: Types.ObjectId;
  macAddress: string;
  eui: string;
  cc: string;
  v: string;
  name: string;
  type: string;
  zone: string;
  hardwareModel: string;
  status: "provisioning" | "paired" | "offline" | "online";
  provisioning: {
    hubMacAddress: string;
    sensorMacAddress: string;
    sharedAt: Date;
  };
  lastActivityAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const sensorSchema = new Schema<ISensor>(
  {
    hub: { type: Schema.Types.ObjectId, ref: "Hub", required: true, index: true },
    macAddress: { type: String, required: true, unique: true, index: true },
    eui: { type: String, required: true, unique: true, index: true },
    cc: { type: String, required: true },
    v: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    zone: { type: String, default: "", trim: true },
    hardwareModel: { type: String, default: "nRF52840" },
    status: { type: String, enum: ["provisioning", "paired", "offline", "online"], default: "provisioning" },
    provisioning: {
      hubMacAddress: { type: String, required: true },
      sensorMacAddress: { type: String, required: true },
      sharedAt: { type: Date, required: true },
    },
    lastActivityAt: { type: Date, default: null },
  },
  { timestamps: true },
);

sensorSchema.index({ hub: 1, macAddress: 1 }, { unique: true });

export type ISensorDocument = HydratedDocument<ISensor>;
export const SensorModel: Model<ISensor> = model<ISensor>("Sensor", sensorSchema);
