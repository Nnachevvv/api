export class UpdateCampaignDto {
  slug?: string
  title?: string
  essence?: string
  coordinatorId?: string
  description?: string
  targetAmount?: number
  startDate?: Date
  endDate?: Date
  deletedAt?: Date
}
