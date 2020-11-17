<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Consulta de Alunos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Cadastrar Aluno
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="defaultItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="defaultItem.ar"
                      label="Registro Acadêmico"
                      v-bind:class="{
                        disabled: editedIndex === 0 ? true : false,
                      }"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="defaultItem.cpf"
                      label="CPF"
                      v-bind:class="{
                        disabled: editedIndex === 0 ? true : false,
                      }"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="defaultItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Deseja realmente excluir o aluno?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Não</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Sim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { studentApi } from "../service/students";
import "./DataTable.css";

export default {
  mounted() {
    this.findAllstudents();
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Registro Acadêmico", value: "ar" },
      { text: "Nome", value: "name" },
      { text: "CPF", value: "cpf" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    students: [],
    editedIndex: -1,
    defaultItem: {
      id: 0,
      name: "",
      ar: "",
      email: "",
      cpf: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar" : "Alterar Cadastro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.students = [];
    },

    editItem(student) {
      this.editedIndex = 0;
      this.defaultItem = Object.assign({}, student);
      this.dialog = true;
    },

    deleteItem(student) {
      this.defaultItem = {
        id: student.id,
        name: student.name,
        ar: student.ar,
        email: student.email,
        cpf: student.cpf,
      };

      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteStudent(this.defaultItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.defaultItem = {
          id: 0,
          name: "",
          ar: "",
          email: "",
          cpf: "",
        };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.defaultItem = {
          id: 0,
          name: "",
          ar: "",
          email: "",
          cpf: "",
        };
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex === -1) {
        const body = {
          name: this.defaultItem.name,
          email: this.defaultItem.email,
          ar: this.defaultItem.ar,
          id: this.defaultItem.id,
          cpf: this.defaultItem.cpf,
        };

        this.createStudent(body);
      } else {
        const body = {
          name: this.defaultItem.name,
          email: this.defaultItem.email,
        };

        this.updateStudent(this.defaultItem.id, body);
      }
      this.close();
    },

    findAllstudents() {
      studentApi
        .findAll()
        .then((response) => {
          this.students = response.data.data;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    deleteStudent(id) {
      studentApi
        .delete(id)
        .then((response) => {
          alert(response.data.data);
          this.findAllstudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },

    updateStudent(id, data) {
      studentApi
        .update(id, data)
        .then((response) => {
          alert(response.data.data);
          this.findAllstudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    createStudent(body) {
      studentApi
        .create(body)
        .then((response) => {
          alert(response.data.data);
          this.findAllstudents();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>