<script setup>
import { TabulatorFull as Tabulator } from "tabulator-tables";

const Pegawai = usePegawaiStore();

const filter = reactive({
  field: "nama",
  type: "like",
  value: "",
});
const tableRef = ref();
const tabulator = ref();
const isLoading = ref(false);
const total_row_display = ref(10);
const total_pages = ref(0);
const page_number = ref(1);
const pegawaiDelete = ref({
  id_pegawai: "",
  nama: "",
  gambar_lama: null,
});

const fetchData = async () => {
  try {
    isLoading.value = true;
    const data = await Pegawai.readItem(page_number.value, total_row_display.value);
    total_pages.value = data.total_pages;
    isLoading.value = false;
    return data.rows;
  } catch (error) {
    isLoading.value = false;
    console.error(error);
  }
};

const deleteUserGet = (data) => {
  pegawaiDelete.value = {
    id_pegawai: data.id_pegawai,
    nama: data.nama,
    gambar_lama: data.foto_profil,
  };
  delete_modal.showModal();
};

const deleteUserPost = (pegawai) => {
  Pegawai.removeItem(pegawai)
    .then((data) => {
      tabulator.value.setData(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const onResetFilter = () => {
  filter.field = "nama";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Filter function
const onFilter = async () => {
  try {
    tabulator.value.setFilter(filter.field, filter.type, filter.value);
  } catch (error) {
    console.error(error);
  }
};

watch(filter, async () => {
  try {
    onFilter();
  } catch (error) {
    alert("Gagal wtch filter" + error);
  }
});

watch(total_row_display, async () => {
  try {
    page_number.value = 1;
    let total = await fetchData();
    tabulator.value.setData(total);
  } catch (error) {
    alert("Gagal wtch change total" + error);
  }
});
watch(page_number, async () => {
  try {
    let total = await fetchData();
    tabulator.value.setData(total);
  } catch (error) {
    alert("Gagal wtch change page" + error);
  }
});

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportJSON = () => {
  tabulator.value.download("json", "data.json");
};
// Print
const onPrint = () => {
  tabulator.value.print();
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: Pegawai.items,
    resizableColumnFit: true,
    responsiveLayout: "collapse",
    layout: "fitColumns",
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Daftar Pegawai<h1>`,
    columnDefaults: {
      minWidth: 90,
    },
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "NIP",
        headerHozAlign: "center",
        responsive: 2,
        field: "nip",
        vertAlign: "middle",
        print: false,
        download: false,
      },
      {
        title: "NAMA",
        headerHozAlign: "center",
        field: "nama",
        hozAlign: "center",
        vertAlign: "middle",
        responsive: 0,
        print: false,
        download: false,
      },
      {
        title: "TEMPAT LAHIR",
        headerHozAlign: "center",
        responsive: 5,
        field: "tempat_lahir",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "ALAMAT",
        headerHozAlign: "center",
        responsive: 6,
        field: "alamat",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "TGL LAHIR",
        headerHozAlign: "center",
        responsive: 7,
        field: "tanggal_lahir",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "L / P",
        responsive: 8,
        headerHozAlign: "center",
        field: "jenis_kelamin",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "GOL",
        responsive: 9,
        headerHozAlign: "center",
        field: "nama_golongan",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "ESELON",
        headerHozAlign: "center",
        responsive: 10,
        field: "nama_eselon",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "JABATAN",
        headerHozAlign: "center",
        responsive: 11,
        field: "nama_jabatan",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "TEMPAT TUGAS",
        headerHozAlign: "center",
        responsive: 12,
        field: "tempat_tugas",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "AGAMA",
        headerHozAlign: "center",
        field: "nama_agama",
        responsive: 13,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "UNIT KERJA",
        headerHozAlign: "center",
        responsive: 14,
        field: "nama_unit",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "NO. HP",
        headerHozAlign: "center",
        field: "no_hp",
        responsive: 15,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },
      {
        title: "NPWP",
        headerHozAlign: "center",
        responsive: 16,
        field: "npwp",
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
      },

      {
        title: "ACTIONS",
        headerHozAlign: "center",
        minWidth: 120,
        field: "actions",
        responsive: 4,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const wrapperDiv = document.createElement("div");
          wrapperDiv.classList.add("flex", "items-center", "mx-2");

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.classList.add("px-2", "py-1", "rounded", "bg-info", "text-white", "mr-2");
          editButton.addEventListener("click", () => navigateTo(`/pegawai/edit/${cell.getData().id_pegawai}`));

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("px-2", "py-1", "rounded", "bg-error", "text-white");
          deleteButton.addEventListener("click", () => deleteUserGet(cell.getData()));

          wrapperDiv.appendChild(editButton);
          wrapperDiv.appendChild(deleteButton);

          return wrapperDiv;
        },
      },
      // For print format
      {
        title: "NIP",
        field: "nip",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NAMA",
        field: "nama",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TEMPAT LAHIR",
        field: "tempat_lahir",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "ALAMAT",
        field: "alamat",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TANGGAL LAHIR",
        field: "tanggal_lahir",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "L/P",
        field: "jenis_kelamin",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "GOL",
        field: "nama_golongan",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "ESLON",
        field: "nama_eslon",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "JABATAN",
        field: "nama_jabatan",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "TEMPAT TUGAS",
        field: "tempat_tugas",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "AGAMA",
        field: "nama_agama",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "UNIT KERJA",
        field: "nama_unit",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NO. HP",
        field: "no_hp",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NPWP",
        field: "npwp",
        visible: false,
        print: true,
        download: true,
      },
    ],
  });
};

const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
  });
};

onMounted(async () => {
  try {
    await fetchData();
    initTabulator();
    reInitOnResizeWindow();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="select select-bordered bg-primary/20 w-full mt-2 sm:mt-0 xl:w-auto"
          >
            <option value="nama">Nama Lengkap</option>
            <option value="nip">N I P</option>
            <option value="jabatan">Jabatan</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-3 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="select select-bordered bg-primary/20 w-full mt-2 sm:mt-0 xl:w-auto"
          >
            <option value="like" selected>like</option>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value=">">></option>
            <option value=">=">>=</option>
            <option value="!=">!=</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-3 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
          <div class="flex w-full mt-2 gap-2 sm:mt-0">
            <input
              id="tabulator-html-filter-value"
              v-model="filter.value"
              type="text"
              :class="filter.value == '' ? 'w-full ' : 'w-10/12 sm:w-9/12 '"
              class="input input-bordered bg-primary/20"
              placeholder="Search..."
            />
            <button
              id="tabulator-html-filter-reset"
              type="button"
              aria-label="reset-button"
              :class="
                filter.value !== ''
                  ? 'visible transition duration-500 ease-in-out opacity-100 '
                  : 'hidden transition duration-500 ease-in-out  opacity-0'
              "
              class="btn btn-outline btn-error w-2/12 sm:w-3/12 text-xl"
              @click="onResetFilter"
            >
              x
            </button>
          </div>
        </div>
      </form>
      <div class="grid grid-cols-1 xl:flex gap-4 mt-5 sm:mt-0">
        <div class="flex w-full gap-2">
          <select v-model="total_row_display" class="select select-bordered bg-primary/20 w-1/4">
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <div class="flex w-3/4 md:w-2/4">
            <button
              :disabled="page_number == 1"
              @click="page_number--"
              aria-label="page-before"
              class="btn w-1/4 btn-outline btn-square border-r-0 border-secondary/40 rounded-r-none bg-accent/30"
            >
              <Icon name="uil:angle-left" class="h-6 w-6" />
            </button>
            <div class="flex w-2/4">
              <input
                v-model="page_number"
                type="number"
                id="page_number"
                name="page_number"
                aria-label="page_number"
                class="input input-bordered w-1/2 bg-primary/20 rounded-none text-center"
              />
              <input
                readonly
                v-model="total_pages"
                type="number"
                id="total_pages"
                name="total_pages"
                aria-label="total_pages"
                class="input input-bordered w-1/2 bg-primary/20 rounded-none text-center"
              />
            </div>
            <button
              :disabled="parseInt(page_number) >= parseInt(total_pages)"
              @click="page_number++"
              aria-label="page-next"
              class="btn w-1/4 btn-square rounded-l-none border-l-0 bg-accent/30 border-secondary/40"
            >
              <Icon name="uil:angle-right" class="h-6 w-6" />
            </button>
          </div>
          <NuxtLink
            to="/pegawai/add"
            class="btn btn-outline md:w-1/4 hidden md:inline items-center flex-col justify-center p-2.5"
          >
            <Icon name="uil:plus" class="w-6 h-6" />
            <span class="text-center">Data</span>
          </NuxtLink>
        </div>
        <div class="flex gap-4 w-full xl:w-7/12">
          <NuxtLink to="/pegawai/add" class="btn btn-outline w-1/3 md:hidden"
            ><Icon name="uil:plus" class="w-6 h-6 md:mr-3" /> <span class="hidden md:block">Data</span></NuxtLink
          >
          <button id="tabulator-print" class="btn btn-outline w-1/3 md:w-1/2" @click="onPrint">
            <Icon name="uil:print" class="w-6 h-6 md:mr-1" /> <span class="hidden md:block">Print</span>
          </button>
          <div class="dropdown dropdown-hover dropdown-end w-1/3 md:w-1/2">
            <label tabindex="0" class="btn btn-outline w-full">
              <Icon name="uil:file-share-alt" class="w-6 h-6 xl:mr-2" /><span class="hidden md:block">Export</span>
            </label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
              <li @click="onExportJSON">
                <a><Icon name="uil:file-alt" class="w-6 h-6 mr-1" /> Export JSON</a>
              </li>
              <li @click="onExportCsv">
                <a><Icon name="uil:file-alt" class="w-6 h-6 mr-1" /> Export CSV</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="isLoading"
      wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-slate-100/20 flex flex-col items-center justify-center"
    >
      <span class="loading loading-dots loading-lg"></span>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <div
        id="tabulator"
        ref="tableRef"
        aria-label="main-table"
        class="mt-5 intro-y table-report table-report--tabulator"
      ></div>
    </div>
    <dialog id="delete_modal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Konfirmasi</h3>
        <p class="py-4">
          Apakah Anda yakin ingin Menghapus <b>{{ pegawaiDelete.id_pegawai }} - {{ pegawaiDelete.nama }} </b> ?
        </p>
        <div class="modal-action">
          <button class="btn">Batal</button>
          <button class="btn btn-error" for="log_out_modal" @click="deleteUserPost(pegawaiDelete)">Ya, Hapus</button>
        </div>
      </form>
    </dialog>
  </div>
</template>
