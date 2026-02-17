import axiosConfig from '../../../core/axiosConfig';

export const getProjectsByUser = async (userId) => {
  const response = await axiosConfig.get(`/projects/users/${userId}`);
  return response.data;
};
