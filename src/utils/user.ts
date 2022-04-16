import { request } from "./api";

export const getUser = async () => { 
    const response = await request.get("/auth/user/");
    const data = response.data;
    return {
        pk: data.pk,
        name: data.name,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        img: `https://ui-avatars.com/api/?name=${data.name}&size=50&color=000000&background=efefef`,
    };
}
