import { Music, MusicCategory, SoundEffect, SoundEffectCategory } from '@/interfaces/Music';
import Parse from 'parse';

Parse.initialize("vlogr", 'QXiinf5f7jxl');

Parse.serverURL = 'https://api.vlogr.com/parse';


export const getMusic = async () => {
    const music = Parse.Object.extend("music");
    const query = new Parse.Query(music);

    try {
        return await query.find();
    } catch (error) {
        console.log({ error });
    }
}

export const getSoundEffects = async () => {
    const soundEffect = Parse.Object.extend("soundEffect");
    const query = new Parse.Query(soundEffect);

    try {
        return await query.find();
    } catch (error) {
        console.log({ error });
    }
}

export const getMusicByCategory = async (category: string) => {
    const music = Parse.Object.extend("music");
    const query = new Parse.Query(music);

    // query.equalTo("category", category);
    query.equalTo("categories", category);

    query.limit(5);

    return query.find();
}

export const getCategories = async () => {
    const musicCategory = Parse.Object.extend("musicCategory");
    const query = new Parse.Query(musicCategory);

    query.ascending('name_en')

    try {
        return await query.find();
    } catch (error) {
        console.log({ error });
    }
}


export const getMusicList = async (): Promise<MusicCategory[]> => {
    try {
        const categories = await getCategories();
        const promises = categories.map(async category => {
            return await getMusicByCategory(category.get("name_en"));
        });

        const musicArr = await Promise.all(promises);

        return categories.map((category, i) => ({
            category: category.get("name_en") as string,
            audios: musicArr[i].map(obj => parseToMusic(obj))
        }));

    } catch (error) {
        console.log({ error });
    }
}

export const getSoundEffectCateogries = async () => {
    const soundEffectCategory = Parse.Object.extend("soundEffectCategory");
    const query = new Parse.Query(soundEffectCategory);

    query.ascending("name_en");

    try {
        return await query.find();
    } catch (error) {
        console.log({ error });
    }
}

export const getSoundEffectsByCategory = async (category: string) => {
    const soundEffect = Parse.Object.extend("soundEffect");
    const query = new Parse.Query(soundEffect);

    // query.equalTo("category", category);
    query.equalTo("categories", category);

    query.limit(5);

    return query.find();
}

export const getSoundEffectList = async (): Promise<SoundEffectCategory[]> => {
    try {
        const categories = await getSoundEffectCateogries();
        const promises = categories.map(async category => {
            return await getSoundEffectsByCategory(category.get("name_en"))
        });

        const soundEffectArr = await Promise.all(promises);

        return categories.map((category, i) => ({
            category: category.get('name_en') as string,
            audios: soundEffectArr[i].map(sound => parseToSoundEffect(sound))
        }))

    } catch (error) {
        console.log(error);
    }
}

const parseToMusic = (object: Parse.Object<Parse.Attributes>): Music => {
    const id = object.id;
    const updatedAt = object.updatedAt;
    const createdAt = object.createdAt;

    const {
        artist,
        categories,
        mp3,
        musicDescription,
        musicDuration,
        title
    } = object.attributes;


    return {
        id,
        artist,
        categories,
        src: mp3,
        duration: musicDuration,
        description: musicDescription,
        title,
        createdAt,
        updatedAt
    }

}

const parseToSoundEffect = (object: Parse.Object<Parse.Attributes>): SoundEffect => {
    const id = object.id;
    const updatedAt = object.updatedAt;
    const createdAt = object.createdAt;

    const { categories, file, name_en } = object.attributes;

    const { _url: src } = file;

    return {
        id,
        src,
        categories,
        title: name_en,
        createdAt,
        updatedAt
    }
}