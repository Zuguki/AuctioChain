import equalsObjects from '../../auxiliaryTools/equalsObjects.ts';

const editPageLogic = async <
    T extends {
        image: string;
    },
>(
    dataUser: T,
    baseObj: T,
    imageFile: File | null,
    blurError: () => void,
    postCorrectImage: () => Promise<string | null>,
): Promise<string | undefined> => {
    if (equalsObjects(dataUser, baseObj) && !imageFile) {
        alert('Правок не было!');
        return;
    }
    blurError();
    let { image } = dataUser;
    if (imageFile) {
        image = (await postCorrectImage()) || '';
        if (!image) {
            alert('Ошибка загрузки изображения!');
            return;
        }
    }
    return image;
};

export default editPageLogic;
