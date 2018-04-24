<template>
  <div class="home">
    <div class="container">
      <div class="row heads">
        <!-- Button trigger modal -->
        <h3>Kamvan</h3>
        <button type="button" class="btn btn-primary btn-sm btn-add" data-toggle="modal" data-target="#modalAdd">
          New Task
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">

                <form id="myForm">
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input v-model="title" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Task Title">
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Description</label>
                    <textarea v-model="description" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Task Short Description"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Point</label>
                    <input v-model="point" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Point">
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Assigned To</label>
                    <input v-model="assign" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Assigned To">
                  </div>
                </form>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="submitTask()" data-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-md-12 board">
          <BackLog></BackLog>
        </div>
        <div class="col-lg-3 col-md-12 board">
          <Todo></Todo>
        </div>
        <div class="col-lg-3 col-md-12 board">
          <Doing></Doing>
        </div>
        <div class="col-lg-3 col-md-12 board">
          <Done></Done>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { namesRef } from '../firebase'
import { tasksRef } from '../firebase'
import BackLog from '../components/BackLog.vue'
import Todo from '../components/ToDo.vue'
import Doing from '../components/Doing.vue'
import Done from '../components/Done.vue'

export default {
  name: 'home',
  components: {
    BackLog,
    Todo,
    Doing,
    Done
  },
  data () {
    return {
      name: '',
      title: '',
      description: '',
      point: '',
      assign: ''
    }
  },
  firebase: {
    persons: namesRef,
    tasks: tasksRef
  },
  methods: {
    submitName () {
      namesRef.push({
        name: this.name,
        edit: false
      })
    },
    submitTask () {
      tasksRef.push({
        title: this.title,
        description: this.description,
        point: this.point,
        assign: this.assign,
        status: 'backlog'
      })
      console.log('Berhasil menambahkan ke dalam task')
      this.name = '',
      this.title = '',
      this.description = '',
      this.point = '',
      this.assign = ''
    }
  }
}
</script>

<style scoped>
  .heads {
    position:relative; 
    padding: 10px;
  }
  .btn-add {
    position: absolute;
    right: 10px;
  }
  label {
    float: left;
  }
</style>
