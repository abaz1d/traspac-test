export const usePegawaiStore = defineStore("pegawai", {
  state: () => ({
    rawItems: [],
  }),
  getters: {
    items: (state) => state.rawItems,
  },
  actions: {
    async readItem(page_number: number, total_row_display: number) {
      try {
        const data = await $fetch(`/api/pegawai?total_row_display=${total_row_display}&page_number=${page_number}`, {
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
    async readDetailItem(id_pegawai: string) {
      try {
        const data = await $fetch(`/api/pegawai/${id_pegawai}`, {
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
    async saveItem(pegawai: {
      id_pegawai: string;
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
        formData.append("id_pegawai", pegawai.id_pegawai);
        formData.append("nama_lengkap", pegawai.nama_lengkap);
        formData.append("nomer_pegawai", pegawai.nomer_pegawai);
        formData.append("tempat_lahir", pegawai.tempat_lahir);
        formData.append("tgl_lahir", pegawai.tgl_lahir);
        formData.append("agama", pegawai.agama);
        formData.append("jenis_kelamin", pegawai.jenis_kelamin);
        formData.append("alamat_lengkap", pegawai.alamat_lengkap);
        formData.append("jabatan", pegawai.jabatan);
        formData.append("tempat_tugas", pegawai.tempat_tugas);
        formData.append("no_hp", pegawai.no_hp);
        formData.append("unit_kerja", pegawai.unit_kerja);
        formData.append("golongan", pegawai.golongan);
        formData.append("eslon", pegawai.eslon);
        formData.append("npwp", pegawai.npwp);
        formData.append("foto_profile", pegawai.foto_profile);
        formData.append("isEdit", pegawai.isEdit);
        let data;
        data = await $fetch("/api/pegawai", {
          method: "POST",
          body: formData,
        });
        return data.success;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    async removeItem(id_pegawai: any) {
      try {
        this.rawItems = this.rawItems.filter((pegawai: any) => pegawai.id_pegawai !== id_pegawai);

        const data = await $fetch(`/api/pegawai/${id_pegawai}`, {
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
