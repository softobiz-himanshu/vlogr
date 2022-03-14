interface BaseAudio {
    id: string;
    title: string;
    categories: string[];
    createdAt?: string | Date;
    src: string;
    updatedAt?: string | Date;
}

export interface Music extends BaseAudio {
    artist: string;
    duration: string;
    description?: string;
}

export interface SoundEffect extends BaseAudio { 
    duration?: string;
    description?: string;
}

export interface MusicCategory {
    category: string;
    audios: Music[]
}

export interface SoundEffectCategory {
    category: string;
    audios: SoundEffect[]
}