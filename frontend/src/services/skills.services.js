import {apiClient} from "./config";

export const apiGetAllSkills =async() => {
    return apiClient.get("/skills");
};
export const apiGetSkill = async(id) => {
return apiClient
}