import httpService from "./http.service";
const productEndpoint = "product/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(productEndpoint, payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    },
    deleteProd: async (payload) => {
        const { data } = await httpService.delete(productEndpoint + payload);
        return data;
    }
};
export default productService;
