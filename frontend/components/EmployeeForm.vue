<template>
  <div class="p-4">
    <form @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
      <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6">Data Personal</h3>
              <p class="mt-1 text-sm">Data Informasi Pribadi Pekerja.</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6">
                    <label class="block underline underline-offset-8 text-sm font-medium text-gray-700">
                      Foto Profil
                    </label>
                    <div class="mt-6 flex items-center">
                      <div class="avatar indicator">
                        <span
                          v-if="previewImage"
                          @click="removeFile()"
                          class="indicator-item cursor-pointer border border-white hover:border-red-500 hover:bg-white bg-red-500 px-1.5 hover:text-red-500 text-white rounded-full"
                          >X</span
                        >
                        <div v-if="previewImage" class="w-20 h-20 rounded-lg">
                          <img :src="previewImage" alt="Profile Preview" />
                        </div>
                        <div v-else class="w-20 h-20 rounded-lg">
                          <Icon name="uil:user-square" class="w-full h-full text-zinc-400" />
                        </div>
                      </div>
                      <label class="block ml-2">
                        <span class="sr-only">Choose profile photo</span>
                        <input
                          type="file"
                          @change="handleFileChange"
                          ref="fotoProfile"
                          accept="image/*"
                          class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="nama_lengkap" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <input
                      id="nama_lengkap"
                      type="text"
                      name="nama_lengkap"
                      v-model="formData.nama_lengkap"
                      autocomplete="nama_lengkap"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="nomer_pegawai" class="block text-sm font-medium text-gray-700"
                      >Nomer Induk Pegawai (NIP)</label
                    >
                    <input
                      id="nomer_pegawai"
                      type="text"
                      name="nomer_pegawai"
                      v-model="formData.nomer_pegawai"
                      autocomplete="nomer_pegawai"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="tempat_lahir" class="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                    <input
                      id="tempat_lahir"
                      type="text"
                      name="tempat_lahir"
                      v-model="formData.tempat_lahir"
                      autocomplete="tempat_lahir"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="tgl_lahir" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                    <input
                      datepi
                      id="tgl_lahir"
                      type="date"
                      name="tgl_lahir"
                      autocomplete="tgl_lahir"
                      v-model="formData.tgl_lahir"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="agama" class="block text-sm font-medium text-gray-700">Agama</label>
                    <select
                      id="agama"
                      name="agama"
                      v-model="formData.agama"
                      class="mt-1 select bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    >
                      <option selected value=" ">Pilih Agama</option>
                      <option>Pilih Agama</option>
                    </select>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="jenis_kelamin" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                    <div
                      class="flex items-center justify-center py-3 space-x-12 bg-white text-black block w-full shadow-sm sm:text-sm border mt-1 border-gray-300 rounded-md"
                    >
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" class="radio radio-info" value="L" v-model="formData.jenis_kelamin" />
                        <span class="text-gray-700">Laki-Laki</span>
                      </label>
                      <label class="flex items-center space-x-2 cursor-pointer">
                        <input type="radio" class="radio radio-error" value="P" v-model="formData.jenis_kelamin" />
                        <span class="text-gray-700">Perempuan</span>
                      </label>
                    </div>
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6">
                    <label for="alamat_lengkap" class="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                    <textarea
                      id="alamat_lengkap"
                      name="alamat_lengkap"
                      rows="5"
                      v-model="formData.alamat_lengkap"
                      class="mt-1 textarea textarea-bordered bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-10">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <div class="sm:mt-0 mt-10">
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6">Data Pekerjaan</h3>
              <p class="mt-1 text-sm">Data Informasi Pekerja di Perusahaan.</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label for="jabatan" class="block text-sm font-medium text-gray-700">Jabatan</label>
                    <input
                      id="jabatan"
                      type="text"
                      name="jabatan"
                      autocomplete="jabatan"
                      v-model="formData.jabatan"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="tempat_tugas" class="block text-sm font-medium text-gray-700">Tempat Tugas</label>
                    <input
                      id="tempat_tugas"
                      type="text"
                      name="tempat_tugas"
                      autocomplete="tempat_tugas"
                      v-model="formData.tempat_tugas"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="no_hp" class="block text-sm font-medium text-gray-700">No. HP / Telephone</label>
                    <input
                      id="no_hp"
                      type="text"
                      name="no_hp"
                      autocomplete="no_hp"
                      v-model="formData.no_hp"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label for="unit_kerja" class="block text-sm font-medium text-gray-700">Unit Kerja</label>
                    <input
                      id="unit_kerja"
                      type="text"
                      name="unit_kerja"
                      autocomplete="unit_kerja"
                      v-model="formData.unit_kerja"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 hidden sm:block" aria-hidden="true">
                    <div class="py-1">
                      <div class="border-t border-gray-200" />
                    </div>
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label for="golongan" class="block text-sm font-medium text-gray-700">Golongan</label>
                    <input
                      id="golongan"
                      type="text"
                      name="golongan"
                      autocomplete="golongan"
                      v-model="formData.golongan"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="eslon" class="block text-sm font-medium text-gray-700">Eslon</label>
                    <input
                      id="eslon"
                      type="text"
                      name="eslon"
                      autocomplete="eslon"
                      v-model="formData.eslon"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label for="npwp" class="block text-sm font-medium text-gray-700">N P W P</label>
                    <input
                      id="npwp"
                      type="text"
                      name="npwp"
                      autocomplete="npwp"
                      v-model="formData.npwp"
                      class="mt-1 input bg-white text-black block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" class="inline-flex justify-center py-2 px-4 shadow-sm text-sm btn btn-error">
                  {{ editing ? "Update" : "Save" }} Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const fotoProfile = ref(null);
const previewImage = ref(null);
const emit = defineEmits();

const props = defineProps({
  data: Object,
  editing: Boolean,
});
const formData = ref({ ...props.data });

const handleFileChange = (event) => {
  const file = event.target.files[0];
  formData.value.foto_profile = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    previewImage.value = null;
  }
};
const removeFile = () => {
  previewImage.value = null;
  formData.value.foto_profile = null;
  fotoProfile.value.value = null;
};

const submitForm = () => {
  if (props.editing) {
    emit("updateUser", formData.value);
  } else {
    emit("addUser", formData.value);
  }
};
</script>
