import { useState } from "react";
export default WorkoutList;

function WorkoutList() {
  // const [workouts, setWorkouts] = useState([
  //   { title: "Chest Day", date: 30, exercises: [] },
  // ]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    exercises: [{ Exercise: "chest day", Reps: "5", Sets: "5" }],
  });

  const handleAddExercise = () => {
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        exercises: [...currentFormData.exercises, {}],
      };
    });
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   setExercises([]);
  // };

  //this function works with the title and date
  const updateForm = (e) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));

    console.log(e.target.id);
  };

  // const updateForm = (e) => {
  //   const { name, value, id } = e.target;

  //   if (id) {
  //     setFormData((currentFormData) => {
  //       const updatedExercises = [...currentFormData.exercises];
  //       updatedExercises[0].Exercise = value;
  //       updatedExercises[0].Reps = value;
  //       updatedExercises[0].Sets = value;

  //       console.log(updatedExercises[0]);
  //       return {
  //         ...currentFormData,
  //         exercises: updatedExercises,
  //       };
  //     });
  //   }
  // };

  // const updateForm = (e) => {
  //   const { name, value, id } = e.target;

  //   if (id) {
  //     console.log(name);
  //     console.log(value);
  //     console.log(id);
  //   }
  // };

  return (
    <>
      <form>
        <label htmlFor="">title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={updateForm}
        />
        <label htmlFor="">date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          onChange={updateForm}
        />

        {formData.exercises.map((exercise, index) => (
          <>
            <div key={`exercise-${index}`} className="dynamic-form">
              <label htmlFor="">Exercise</label>
              <input
                id="exercise"
                type="text"
                name="Exercise"
                // value={formData.exercises.Exercise}
                onChange={updateForm}
              />

              <label htmlFor="">Reps</label>
              <input
                id="reps"
                type="text"
                name="Reps"
                // value={formData.exercises.Reps}
                onChange={updateForm}
              />

              <label htmlFor="">Sets</label>
              <input
                id="sets"
                type="text"
                name="Sets"
                // value={formData.exercises.Sets}
                onChange={updateForm}
              />
              {index === formData.exercises.length - 1 && (
                <button onClick={handleAddExercise}>Add Exercise</button>
              )}
            </div>
          </>
        ))}
      </form>
    </>
  );
}
