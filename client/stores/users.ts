export const useUserStore = defineStore("users", {
  state: () => ({
    rawItems: [],
    rawRegions: [],
  }),
  getters: {
    items: (state) => state.rawItems,
    regions: (state) => state.rawRegions,
  },
  actions: {
    async readItem(page_number: number, total_row_display: number) {
      try {
        const data = await $fetch(`/api/users?total_row_display=${total_row_display}&page_number=${page_number}`, {
          method: "GET",
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
          query: {
            page_number,
            total_row_display,
          },
        });
        if (data.success) {
          this.rawItems = data.data.rows;
          return data.data;
        }
      } catch (error) {
        throw new Error(error as string);
      }
    },
    async readDetailItem(id_user: string) {
      try {
        const data = await $fetch(`/api/users/${id_user}`, {
          method: "GET",
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });
        if (data.success) {
          return data.data;
        }
      } catch (error) {
        throw new Error(error as string);
      }
    },
    async saveItem(user: {
      id_user: string;
      nama_lengkap: string;
      nomer_pegawai: string;
      tempat_lahir: string;
      tgl_lahir: string;
      agama: string;
      jenis_kelamin: string;
      alamat_lengkap: string;
      jabatan: string;
      tempat_tugas: string;
      no_hp: string;
      unit_kerja: string;
      eslon: string;
      npwp: string;
      golongan: string;
      foto_profile: File;
      isEdit: string;
    }) {
      try {
        const formData = new FormData();
        formData.append("id_user", user.id_user);
        formData.append("nama_lengkap", user.nama_lengkap);
        formData.append("nomer_pegawai", user.nomer_pegawai);
        formData.append("tempat_lahir", user.tempat_lahir);
        formData.append("tgl_lahir", user.tgl_lahir);
        formData.append("agama", user.agama);
        formData.append("jenis_kelamin", user.jenis_kelamin);
        formData.append("alamat_lengkap", user.alamat_lengkap);
        formData.append("jabatan", user.jabatan);
        formData.append("tempat_tugas", user.tempat_tugas);
        formData.append("no_hp", user.no_hp);
        formData.append("unit_kerja", user.unit_kerja);
        formData.append("golongan", user.golongan);
        formData.append("eslon", user.eslon);
        formData.append("npwp", user.npwp);
        formData.append("foto_profile", user.foto_profile);
        formData.append("isEdit", user.isEdit);
        let data;
        data = await $fetch("/api/users", {
          method: "POST",
          body: formData,
        });
        return data.success;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    async removeItem(id_user: any) {
      try {
        this.rawItems = this.rawItems.filter((user: any) => user.id_user !== id_user);

        const data = await $fetch(`/api/users/${id_user}`, {
          method: "DELETE",
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });
        return this.rawItems;
      } catch (error) {
        throw new Error(error as string);
      }
    },
  },
});
