import createFetchClient from "openapi-fetch";
import { paths } from "../type/schema";
import createClient from "openapi-react-query";

export const fetchClient = createFetchClient<paths>({
  baseUrl: "https://petstore3.swagger.io/api/v3",
});
export const $api = createClient(fetchClient);
