class AppConfig {

    // Backend urls:
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly vacationUrl = "http://localhost:4000/api/vacation-by-id/";
    public readonly usersUrl = "http://localhost:4000/api/users/";
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly likeUrl = "http://localhost:4000/api/like/";
    public readonly vacationImageUrl = "http://localhost:4000/api/image-by-name/"


    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

export const appConfig = new AppConfig();
