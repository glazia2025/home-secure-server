export interface NotificationDto {
  id: string;
  userId: string;
  hubId: string;
  sensorId: string | null;
  sensor: {
    id: string;
    name: string;
    macAddress: string;
    type: string;
    zone: string;
  } | null;
  eventType: string;
  severity: string;
  title: string;
  message: string;
  deliveredAt: Date | null;
  readAt: Date | null;
  createdAt: Date;
}
