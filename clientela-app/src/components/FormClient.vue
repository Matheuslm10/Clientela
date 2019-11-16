<template>
  <v-container>
    <v-form>
      <v-row no-gutters>
        <h2 class="mb-6 mt-6">Informações Pessoais</h2>
        <v-col cols="12">
          <validation-provider name="nome" rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="client.name"
              outlined
              :error-messages="errors[0]"
              label="Nome do Cliente"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="email" rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="client.email"
              outlined
              :error-messages="errors[0]"
              label="Email do Cliente"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="cpf" rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="client.cpf"
              outlined
              :error-messages="errors[0]"
              label="CPF do Cliente"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <h2 class="mb-6">Endereço</h2>
        <v-col cols="12">
          <validation-provider name="cep" rules="required" v-slot="{ errors }">
            <v-text-field
              :loading="findingAddress"
              v-model="client.zipCode"
              @input="findAddress"
              outlined
              :error-messages="errors[0]"
              label="CEP do Cliente"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="logradouro" rules="required" v-slot="{ errors }">
            <v-text-field
              :disabled="addressLock"
              v-model="client.street"
              outlined
              :error-messages="errors[0]"
              label="Logradouro"
              hint="Exemplo: Rua, Avenida, etc"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="estado" rules="required" v-slot="{ errors }">
            <v-text-field
              :disabled="addressLock"
              v-model="client.state"
              outlined
              :error-messages="errors[0]"
              label="Estado"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="cidade" rules="required" v-slot="{ errors }">
            <v-text-field
              :disabled="addressLock"
              v-model="client.city"
              outlined
              :error-messages="errors[0]"
              label="Cidade"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="bairro" rules="required" v-slot="{ errors }">
            <v-text-field
              :disabled="addressLock"
              v-model="client.neighborhood"
              outlined
              :error-messages="errors[0]"
              label="Bairro"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-col cols="12">
          <validation-provider name="logradouro" rules="required" v-slot="{ errors }">
            <v-text-field
              :disabled="addressLock"
              v-model="client.number"
              outlined
              :error-messages="errors[0]"
              label="Número"
              type="number"
            ></v-text-field>
          </validation-provider>
        </v-col>
        <v-row justify="center">
          <v-btn color="success" @click="save">Finalizar Cadastro</v-btn>
        </v-row>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
  data: () => ({
    client: {},
    addressLock: true,
    findingAddress: false
  }),
  methods: {
    async findAddress() {
      if (this.client.zipCode && this.client.zipCode.length === 8) {
        this.findingAddress = true;
        let resp = await Axios.get(
          `https://viacep.com.br/ws/${this.client.zipCode}/json`
        );

        this.client.street = resp.data.logradouro;
        this.client.state = resp.data.uf;
        this.client.city = resp.data.localidade;
        this.client.neighborhood = resp.data.bairro;

        this.findingAddress = false;
        this.addressLock = false;
      }
    },
    save() {
      this.$store.dispatch('showSuccessSnackBar', 'Salvo com sucesso!')
    }
  }
};
</script>