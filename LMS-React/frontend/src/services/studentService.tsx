// import api from '../services/api'; // Import the configured axios instance
// import { Student } from "../types/index";

// const API_URL = "students/students/"; // Relative to baseURL in AuthContext

// export const fetchAllStudents = async () => {
//   try {
//     const response = await api.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     throw error;
//   }
// };

// export const createStudent = async (studentData: Student) => {
//   try {
//     const response = await api.post(API_URL, studentData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating student:", error);
//     throw error;
//   }
// };

// export const updateStudent = async (id: number, studentData: Student) => {
//   try {
//     const updateUrl = `${API_URL}${id}/`;
//     const dataToSend = {
//       student_name: studentData.student_name,
//       email: studentData.email,
//       department: studentData.department,
//       contact_number: studentData.contact_number,
//       user: studentData.user,
//     };
//     const response = await api.put(updateUrl, dataToSend);
//     return response.data;
//   } catch (error: any) {
//     console.error("Error updating student:", error);
//     console.error("Error details:", error.response?.data || error.message);
//     throw error;
//   }
// };

// export const deleteStudent = async (id: number) => {
//   try {
//     const deleteUrl = `${API_URL}${id}/`;
//     await api.delete(deleteUrl);
//     return true;
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     throw error;
//   }
// };

import api from '../services/api'; // Import the configured axios instance
import { Student } from "../types/index";

const API_URL = "students/students/"; // Relative to baseURL in AuthContext

export const fetchAllStudents = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const createStudent = async (studentData: Student) => {
  try {
    // Log the data to be sent to ensure it is correct
    console.log("Creating student with data:", studentData);
    
    // Ensure the data being sent matches the required fields in the backend
    const response = await api.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const updateStudent = async (id: number, studentData: Student) => {
  try {
    const updateUrl = `${API_URL}${id}/`;
    const dataToSend = {
      student_name: studentData.student_name,
      email: studentData.email,
      department: studentData.department,
      contact_number: studentData.contact_number
    };
    const response = await api.put(updateUrl, dataToSend);
    return response.data;
  } catch (error: any) {
    console.error("Error updating student:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const deleteUrl = `${API_URL}${id}/`;
    await api.delete(deleteUrl);
    return true;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
