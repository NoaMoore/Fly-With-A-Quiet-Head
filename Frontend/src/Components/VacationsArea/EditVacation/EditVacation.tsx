import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { notify } from "../../../Utils/Notify";
import VacationModel from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import useTitle from "../../../Utils/UseTitle";

function EditVacation(): JSX.Element {
  useTitle("Edit vacation");
  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();
  const params = useParams();

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    vacationsService
      .getOneVacation(+params.id)
      .then((vacation) => {
        setValue("destination", vacation.destination); // Initial value
        setValue("description", vacation.description); // Initial value
        const formatDate = (date: string) => {
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, '0');
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const year = d.getFullYear();
          return `${year}-${month}-${day}`;
        };

        const formattedStartDate = formatDate(vacation.startDate);
        const formattedEndDate = formatDate(vacation.endDate);
        setValue("startDate", formattedStartDate);
        setValue("endDate", formattedEndDate);
        setValue("price", vacation.price);
        setImageUrl(vacation.imageUrl);
      })
      .catch((err) => notify.error(err));
  }, [params.id, setValue]);

  async function send(vacation: VacationModel) {
    try {
      // Extract first image from FileList into vacation.image:
      vacation.image = (vacation.image as unknown as FileList)[0];

      // Set the id:
      vacation.id = +params.id;

      // Send vacation to backend:
      await vacationsService.updateVacation(vacation);

      notify.success("Vacation has been updated.");

      navigate("/vacations");
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <div className="EditVacation">
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
        <input type="file" {...register("image")} />

        <img className="thumbnail" src={imageUrl} alt="vacationImage" />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditVacation;
