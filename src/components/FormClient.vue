<template>
  <v-container>
    <v-form>
      <v-row no-gutters>
        <h2 class="mb-6 mt-6">Informações Pessoais</h2>
        <v-col cols="12">
          <v-text-field v-model="client.name" outlined label="Nome do Cliente"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="client.email" outlined label="Email do Cliente"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="client.cpf" outlined label="CPF do Cliente" type="number"></v-text-field>
        </v-col>
        <h2 class="mb-6">Endereço</h2>
        <v-col cols="12">
          <v-text-field :loading="findingAddress" v-model="client.zipCode" outlined label="CEP do Cliente" type="number"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field :disabled="addressLock" v-model="client.street" outlined label="Logradouro" hint="Exemplo: Rua, Avenida, etc"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field :disabled="addressLock" v-model="client.state" outlined label="Estado"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field :disabled="addressLock" v-model="client.city" outlined label="Cidade"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field :disabled="addressLock" v-model="client.neighborhood" outlined label="Bairro"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field :disabled="addressLock" v-model="client.number" outlined label="Número" type="number"></v-text-field>
        </v-col>
        <v-row justify="center">
          <v-btn color="success">Finalizar Cadastro</v-btn>
        </v-row>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    client: {},
    addressLock: true,
    findingAddress: false
  }),
  methods: {
  },
  watch: {
    async 'client.zipCode'() {
      if(this.client.zipCode && this.client.zipCode.length === 8){
        
        this.findingAddress = true
        let resp = await Axios.get(`https://viacep.com.br/ws/${this.client.zipCode}/json`)        

        this.client.street = resp.data.logradouro
        this.client.state = resp.data.uf
        this.client.city = resp.data.localidade
        this.client.neighborhood = resp.data.bairro
        
        this.findingAddress = false
        this.addressLock = false
      }
       
    }
  }
}
</script>