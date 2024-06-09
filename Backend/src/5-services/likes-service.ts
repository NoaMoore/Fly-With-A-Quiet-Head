import { OkPacketParams } from "mysql2";
import { LikeModel } from "../3-models/like-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { dal } from "../2-utils/dal";

class LikesService {
    // public async getAllLikes(): Promise<LikeModel[]> {
    //     const sql = "SELECT * FROM likes";
    //     const likes = await dal.execute(sql);
    //     console.log(likes);
    //     return likes;
    // }
    public async likeVacation(userId: number, vacationId: number): Promise<void> {
        const sql = "INSERT INTO likes VALUES(?,?)";
        const values = [userId, vacationId]; 
        const info: OkPacketParams = await dal.execute(sql, values);
        if(info.affectedRows === 0) throw new ResourceNotFoundError(userId);
    }

    public async unlikeVacation(userId: number, vacationId: number): Promise<void> {
        console.log(`${userId}`)
        console.log(`${vacationId}`)
        const sql = "DELETE FROM likes WHERE userId = ? AND vacationId = ?";
        const values = [userId, vacationId]; 
        const info: OkPacketParams = await dal.execute(sql, values);
        if(info.affectedRows === 0) throw new ResourceNotFoundError(userId);
    }
}

export const likesService = new LikesService;