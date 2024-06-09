class VacationModel {

    public id: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageName: string;
    public imageUrl: string;
    public image: File;
    public likesCount: number;
    public isLiked: number;
}

export default VacationModel;
