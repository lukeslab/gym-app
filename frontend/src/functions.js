export function setCurrentSession(session){
    // if(workout.title) {
    //     // this will ignore the initial session entry. If title has a value, then decode.
    //     workout = {
    //         ...workout,
    //         title: decodeURIComponent(workout.title)
    //     }
    // }
    return localStorage.setItem('currentSession', JSON.stringify(session))
}

export function getCurrentSession(){
    return JSON.parse(localStorage.getItem('currentSession'));
}

export async function getCurrentUserId(){
    return '63c704a14822fbc0975a9fa7';
}

export async function getUserWorkouts(){
    const userId = await getCurrentUserId();
    const response = await fetch(`/workouts/user/${userId}`);
    if (!response.ok) {
        throw { message: 'Failed to fetch workouts', status: 500};
    }
    const workouts = await response.json()

    console.log("Got user workouts: ", workouts)
    return workouts;
}

export async function getAllExercises(){
    const response = await fetch('/exercises');
    if(!response.ok) throw { message: 'Failed to fetch exercsies' }

    const exercises = await response.json()

    console.log("Got exercises: ", exercises)
    return exercises;
}

export async function createExercise({title, sets, reps, weight}){
    console.log('creating exercise')
    const body = {
        title,
        sets,
        reps,
        weight
    }
    const options = {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    }
    const response = await fetch('/exercises', options)
    if (!response.ok) {
        throw new Error('failed to create exercise')
    }
    const message = await response.json()
    console.log(`exercise ${title} created!`)
    return message;
}