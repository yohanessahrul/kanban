<template>
  <div class="todo">
    <h5><i class="fas fa-list-ul"></i>  Todo</h5>
      <div class="list">
        <ul>
          <li v-for="task of tasks" v-if="task.status == ['todo']" v-bind:key="task['.key']">
            <h5>{{ task.title }}</h5>
            <p>Score: {{ task.point }}</p>
            <p>Assign to: {{ task.assign }}</p>
            
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-info btn-sm btnctsm" data-toggle="modal" data-target="#modalTodo" v-on:click="popModal(task)">
              Show Details
            </button>

            <!-- Modal -->
            <div class="modal fade" id="modalTodo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Detail Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5>Task Description</h5>
                    <p>{{ modalDescription }}</p>
                    <h5>Point :</h5>
                    <p>{{ modalPoint }}</p>
                  </div>
                  <div class="modal-footer">
                    <button v-on:click="goToBacklog()" class="left btn btn-warning" data-dismiss="modal">BackLog</button>
                    <button v-on:click="deleteTask()" class="center btn btn-danger" data-dismiss="modal">Delete</button>
                    <button v-on:click="goToDoing()" class="right btn btn-primary" data-dismiss="modal">Doing</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { tasksRef } from '../firebase'
export default {
  name: 'Todo',
  data () {
      return {
        modalKey: '',
        modalTitle: '',
        modalPoint: '',
        modalStatus: '',
        modalDescription: ''
      }
  },
  firebase: {
    tasks: tasksRef
  },
    methods: {
      popModal (taskValue) {
        this.modalKey = taskValue['.key']
        this.modalTitle = taskValue.title
        this.modalPoint = taskValue.point
        this.modalStatus = taskValue.status
        this.modalDescription = taskValue.description
      },
      goToBacklog () {
        tasksRef.child(this.modalKey).update({ status: 'backlog' })
      },
      deleteTask () {
        if(confirm('Yakin mau hapus?')) {
          tasksRef.child(this.modalKey).remove()
        }
      },
      goToDoing () {
        tasksRef.child(this.modalKey).update({ status: 'doing' })
      }
    }
}
</script>

<style>

ul {
  /* background: red; */
  padding-left: 0px !important;
}

.board {
  width: 100%;
  padding: 5px;
}

.backlog, .todo, .doing, .done {
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  border: thin solid #c4d3d3;
  /* -webkit-box-shadow: 1px 1px 5px 1px #D9D9D9;
  box-shadow: 1px 1px 5px 1px #D9D9D9; */
}
.backlog > h5 {
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #FF0000;
  padding: 15px;
  color: white;
  text-align: left;
}
.todo > h5 {
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #FF9800;
  padding: 15px;
  color: white;
  text-align: left;
}
.doing > h5 {
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #3981FF;
  padding: 15px;
  color: white;
  text-align: left;
}
.done > h5 {
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #00DD69;
  padding: 15px;
  color: white;
  text-align: left;
}

.fas {
  font-size: 16px;
  margin-right: 3px;
}

.list {
  padding: 10px;
}

.list > ul {
  width: 100%;
  /* background: red; */
  /* height: 90%; */
}

.list > ul > li {
  margin-left: 0;
  width: 100%;
  /* height: 50px; */
  border: thin solid #eaeaea;
  margin-bottom: 15px;
  border-radius: 3px;
}
.list > ul > li:hover {
  -webkit-box-shadow: 0 0 3px 1px #BFBFBF;
  box-shadow: 0 0 3px 1px #BFBFBF;
}
.list > ul > li > h5 {
  font-weight: bold;
  font-size: 14px;
  padding: 10px;
  border-bottom: thin solid #eaeaea;
  margin-bottom: 20px;
  color: #4c4c4c;
}
.list > ul > li > p {
  color: #3f3f3f;
  font-size: 14px;
  line-height: 0.3em;
  text-align: left;
  padding-left: 15px;
}

.btnctsm {
  margin: 5px 0 15px 0;
  /* float: left;
  margin-left: 10px; */
}

.modal-footer {
  display: inline-table;
}

.left {
  float: left;
}

.right {
  float: right;
}

</style>
