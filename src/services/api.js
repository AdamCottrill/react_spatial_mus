import axios from "axios";

let api;

if (import.meta.env.DEV) {
  api = axios.create({
    baseURL: "/api",
  });
} else {
  api = axios.create({
    baseURL: "/spatial_mus/api",
  });
}

export const getMuTypes = () =>
  api.get("/management_unit_types/").then((res) => res.data);

export const getSamples = (mu_type, year) =>
  api.get(`/samples/?mu_type=${mu_type}&year=${year}`).then((res) => {
    const data = res.data.results.map((row) => {
      const prj_cd = row.slug.split("-")[0].toUpperCase();
      const mu = row.area
        ? row.area.split("_").slice(-1).pop().toUpperCase()
        : null;

      return { prj_cd, mu, ...row };
    });
    return data;
  });
