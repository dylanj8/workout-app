import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
export default StackTest;

function StackTest() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    exercises: [{ Exercise: "benchpress", Reps: "5", Sets: "5" }],
  });

  const [workout, setWorkout] = useState([]);

  const [dbData, setDbData] = useState([]);

  //firebase

  const workoutCollectionRef = collection(db, "workouts");

  //firebase

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutCollectionRef);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const dbWorkouts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDbData(...dbData, dbWorkouts);
    };
    getWorkouts();
  }, []);

  const handle = (e, type, index) => {
    const localExer = [...formData.exercises];
    localExer[index].Exercise =
      type === "E" ? e.target.value : formData.exercises[index].Exercise;
    localExer[index].Reps =
      type === "R" ? e.target.value : formData.exercises[index].Reps;
    localExer[index].Sets =
      type === "S" ? e.target.value : formData.exercises[index].Sets;

    setFormData({
      title: formData.title,
      date: formData.date,
      exercises: [...localExer],
    });
  };

  const updateForm = (e) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    setFormData((currentFormData) => {
      return {
        ...currentFormData,
        exercises: [
          ...currentFormData.exercises,
          { Exercise: "benchpress", Reps: "5", Sets: "5" },
        ],
      };
    });
  };
  const createWorkout = async (workout) => {
    try {
      await addDoc(workoutCollectionRef, { workout });
    } catch (error) {
      console.log(error);
    }
  };

  const addWorkout = async (e) => {
    e.preventDefault();
    let newWorkouts = [...workout, formData];
    setWorkout(newWorkouts);
    await createWorkout(workout);
    console.log(workout);
  };

  const deleteWorkout = async (id) => {
    const singleWorkout = doc(db, "workouts", id);
    await deleteDoc(singleWorkout);
    console.log(singleWorkout);
  };
  return (
    <>
      <form action="">
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

        {formData.exercises.map((exercise, index) => {
          return (
            <div key={index}>
              <input
                placeholder="exercise"
                onChange={(e) => handle(e, "E", index)}
              />

              <input
                placeholder="reps"
                onChange={(e) => handle(e, "R", index)}
              />
              <input
                placeholder="sets"
                onChange={(e) => handle(e, "S", index)}
              />
              <button onClick={handleAddExercise}>Add Exercise</button>
            </div>
          );
        })}
        <button onClick={addWorkout}>Add Workout</button>
      </form>

      <section>
        {dbData.map((data, index) => {
          const { id } = data;
          return (
            <div key={index}>
              {index} <button onClick={() => deleteWorkout(id)}></button>
            </div>
          );
        })}
      </section>
    </>
  );
}
