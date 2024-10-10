
const changeUserDetailsAsync = async (api, newUserDetails) => {
    const response = await api.post("/user/change-details", newUserDetails);
    return response;
};

export { changeUserDetailsAsync };

