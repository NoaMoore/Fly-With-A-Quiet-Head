import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AddVacation.css";
import { notify } from "../../../Utils/Notify";
import VacationModel from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import useTitle from "../../../Utils/UseTitle";

function AddVacation(): JSX.Element {

  useTitle("Add vacation");

  const { register, handleSubmit } = useForm<VacationModel>();

  const navigate = useNavigate();

  async function send(vacation: VacationModel) {
    try {
      // Extract first image from FileList into product.image:
      vacation.image = (vacation.image as unknown as FileList)[0];

      // Send product to backend:
      await vacationsService.addVacation(vacation);

      notify.success("Vacation has been added.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="AddVacation">
      <form onSubmit={handleSubmit(send)}>
        <label>Destination: </label>
        <input type="text" {...register("destination")} required />

        <label>Description: </label>
        <input
          type="text"
          step="0.01"
          {...register("description")}
          required
          maxLength={180}
        />

        <label>Start Date: </label>
        <input type="date" {...register("startDate")} required />

        <label>End Date: </label>
        <input type="date" {...register("endDate")} required />

        <label>Price: </label>
        <input
          type="number"
          {...register("price")}
          required
          min={0}
          max={10000}
        />

        <label>Image: </label>
        <input type="file" {...register("image")} required />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddVacation;
