import httpService from "./http.service";

const userPurchases = "purchases/";

const purchasesService = {
    create: async (payload) => {
        const { data } = await httpService.put(
            "user/" + payload._id + userPurchases + payload._id,
            payload
        );
        return data;
    }
};
export default purchasesService;
