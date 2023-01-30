export function setCurrentSession(workout){
    if(workout.title) {
        // this will ignore the initial session entry. If title has a value, then decode.
        workout = {
            ...workout,
            title: decodeURIComponent(workout.title)
        }
    }
    return localStorage.setItem('currentSession', JSON.stringify(workout))
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

    console.log("from fetch: ", workouts)
    return workouts;
    
}