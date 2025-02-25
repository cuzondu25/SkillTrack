import Axios from 'axios';

const API_URL = 'https://cuzondu25.pythonanywhere.com/api/course';

export const fetchCourses = async () => {
    const response = await Axios.get(`${API_URL}/courses`);
    return response.data;
};

export const enrollInCourse = async (courseId, token) => {
    const response = await Axios.post(
        `${API_URL}/courses/enroll`,
        { course_id: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const fetchEnrolledCourses = async (token) => {
    const response = await Axios.get(`${API_URL}/courses/enrolled`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
