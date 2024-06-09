import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";
import { VacationModel } from "../3-models/vacation-model";

class VacationsService {

  // Get all vacations from database:
  public async getAllVacations(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT DISTINCT
        V.*,
            CONCAT('${appConfig.baseImageUrl}',V.imageName) as imageUrl,
        EXISTS(SELECT * FROM likes WHERE vacationId = V.ID AND userId = ?) AS isLiked,
        (SELECT COUNT(*) FROM LIKES WHERE vacationId = V.ID   GROUP BY vacationId) AS likesCount
    FROM vacations as V 
    GROUP BY V.id
    ORDER BY V.startDate;`;
    
    const values = [userId];
    const vacations = await dal.execute(sql, [values]);
    console.log(vacations);
    return vacations;
  }

  // Get one vacation from database:
  public async getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT *, CONCAT('${appConfig.baseImageUrl}', imageName) as imageUrl FROM vacations WHERE id = ?`;
    const values = [id];
    const vacations = await dal.execute(sql, values);
    const vacation = vacations[0];
    if (!vacation) throw new ResourceNotFoundError(id);
    return vacation;
  }

  // Add new vacation:
  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateInsert();
    const imageName = await fileSaver.add(vacation.image);
    const sql = `INSERT INTO vacations(destination, description, startDate, endDate, price, imageName) VALUES(?, ?, ?, ?, ?, ?)`;
    const values = [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);
    vacation = await this.getOneVacation(info.insertId);
    return vacation;
  }

  // Update existing vacation:
  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateUpdate();
    const oldImageName = await this.getImageName(vacation.id);
    // Save new image instead of the old one:
    const newImageName = vacation.image ? await fileSaver.update(oldImageName, vacation.image) : oldImageName;
    const sql = `UPDATE vacations SET
        destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageName = ? WHERE id = ?`;

    const values = [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      newImageName,
      vacation.id,
    ];
    
    const info: OkPacketParams = await dal.execute(sql, values);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
    vacation = await this.getOneVacation(vacation.id);
    console.log(vacation);
    return vacation;
  }

  // Delete vacation:
  public async deleteVacation(id: number): Promise<void> {
    const oldImageName = await this.getImageName(id);
    const sql = "DELETE FROM vacations WHERE id = ?";
    const values = [id];
    const info: OkPacketParams = await dal.execute(sql, values);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    await fileSaver.delete(oldImageName);
    console.log(id);
  }

  private async getImageName(id: number): Promise<string> {
    const sql = "SELECT imageName from vacations WHERE id = ?";
    const values = [id];
    const vacations = await dal.execute(sql, values);
    const vacation = vacations[0];
    const imageName = vacation.imageName;
    return imageName;
  }
}

export const vacationsService = new VacationsService();
