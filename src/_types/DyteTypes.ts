export interface StorageConfig {
  type: string;
  secret: string;
  bucket: string;
  region: string;
  path: string;
  auth_method: "KEY" | "PASSWORD";
  username: string;
  password: string;
  host: string;
  port: number;
  private_key: string;
}

export interface AudioConfig {
  codec: string;
  channel: string;
  export_file: boolean;
}

export interface VideoConfig {
  codec: string;
  width: number;
  height: number;
  watermark: {
    url: string;
    size: {
      height: number;
      width: number;
    };
    position: "left top" | "right top" | "left bottom" | "right bottom";
  };
  export_file: boolean;
}

export interface RecordingConfig {
  max_seconds: number;
  file_name_prefix: string;
  video_config: VideoConfig;
}

export interface DyteMeeting {
  id: string;
  title: string;
  preferred_region:
    | "ap-south-1"
    | "ap-southeast-1"
    | "us-east-1"
    | "eu-central-1"
    | null;
  created_at: string;
  record_on_start: boolean;
  updated_at: string;
  live_stream_on_start: boolean;
  status: "ACTIVE" | "INACTIVE";
  recording_config: RecordingConfig;
  audio_config: AudioConfig;
  storage_config: StorageConfig;
  dyte_bucket_config: {
    enabled: boolean;
  };
  live_streaming_config: {
    rtmp_url: string;
  };
}

export interface DyteMeetingData {
  success: boolean;
  data: DyteMeeting;
}

export interface DyteParticipant {
  id: string;
  name: string | null;
  picture: string | null;
  custom_participant_id: string;
  preset_name: string;
  created_at: string;
  update_at: string;
  token: string;
}

export interface DyteParticipantData {
  success: boolean;
  data: DyteParticipant;
}
