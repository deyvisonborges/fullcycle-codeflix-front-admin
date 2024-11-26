import { CamelCase } from '../../utils/types'
import { VideoAPIModel } from './api/video.api-model'

export type VideoUIModel = CamelCase<VideoAPIModel>
