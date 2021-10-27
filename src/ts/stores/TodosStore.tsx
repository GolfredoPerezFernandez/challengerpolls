/**
* TodosStore.tsx
* Copyright: Microsoft 2017
*
* Resub Basic Example https://github.com/Microsoft/ReSub
*/

import * as _ from 'lodash';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { Todo, Option } from '../models/TodoModels';

import LocalDb from '../app/LocalDb';
@AutoSubscribeStore
class TodosStore extends StoreBase {
    private _todos: Todo[] = []


    startup() {
        return LocalDb.getAllTodos().then(todos => {
            this._todos = todos;
        });
    }
    private _myTodos: Todo[] = []
    private _option: Option = {
        id: "",
        creationTime: 1,
        title: '',
        url: '',
        votes: 0,
        votesPercent: '',
        _searchTerms: ''
    }
    private _options: Option[] = []
    resetOptions() {


        this._options = []

        // Asynchronously write the new todo item to the DB.

        this.trigger();
    }
    resetOption() {


        this._option = {
            id: "",
            creationTime: 1,
            title: '',
            url: '',
            votes: 0,
            votesPercent: '',
            _searchTerms: ''
        }

        // Asynchronously write the new todo item to the DB.

        this.trigger();
    }

    private _cargando: boolean = false

    private _todoId: string = ''
    @autoSubscribe
    getCargando() {
        return this._cargando
    }
    @autoSubscribe
    getTodoId() {
        return this._todoId
    }
    setTodoId(id: string) {
        this._todoId = id

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return
    }


    async setPollClosed(item: Todo) {
        let others = _.filter(this._todos, todo => todo.pollId !== item.pollId)

        if (item) {
            this._todos = await [...others, item];

        }
        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return
    }
    async setVote(item: Todo) {
        let others = _.filter(this._todos, todo => todo.pollId !== item.pollId)

        if (item) {
            this._todos = await [...others, item];

        }
        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return
    }
    setCargando(bol: boolean) {
        this._cargando = bol

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return
    }

    addOption(options: Option) {


        this._options = this._options.concat(options);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return options;
    }

    addMyTodo(pollId: string, voted: boolean, owners: string[], title: string, duration: number, time: number, openPoll: boolean, winner: string, totalVotes: number, options: Option[], ownerAddress: string, createdAt: number) {

        const newTodo: Todo = {
            pollId,
            time,
            duration,
            createdAt,
            winner,
            owners,
            title,
            voted,
            openPoll,
            options: [...options],
            totalVotes,
            ownerAddress,
            _searchTerms: title,
        };

        this._myTodos = this._myTodos.concat(newTodo);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return newTodo;
    }

    addTodo(pollId: string, voted: boolean, owners: string[], title: string, duration: number, time: number, openPoll: boolean, winner: string, totalVotes: number, options: Option[], ownerAddress: string, createdAt: number) {

        const newTodo: Todo = {
            pollId,
            time,
            owners,
            createdAt,
            winner,
            voted,
            duration,
            title,
            openPoll,
            options: [...options],
            totalVotes,
            ownerAddress,
            _searchTerms: title,
        };

        this._todos = this._todos.concat(newTodo);

        // Asynchronously write the new todo item to the DB.

        this.trigger();

        return newTodo;
    }

    @autoSubscribe
    getOptionById() {

        return this._option
    }
    @autoSubscribe
    getMyTodos() {
        return this._myTodos;
    }
    @autoSubscribe
    getTodos() {
        return this._todos;
    }
    @autoSubscribe
    getOptions() {
        return this._options;
    }

    @autoSubscribe
    getOptionsById(todoId: string) {
        var poll: Option[] = []
        let find = _.find(this._todos, todo => todo.pollId === todoId)
        if (find) {
            poll = find.options

            this.setOptions(find.options)
        };

        return poll
    }

    setMyTodos(newTodos: Todo[]) {
        this._myTodos = newTodos

        this.trigger();
    }
    setTodos(newTodos: Todo[]) {
        this._todos = newTodos
        this.trigger();
    }
    async setOptionById(todoId: string) {
        var res = await _.find(this._options, todo => todo.id === todoId)
        if (res) {
            this._option = res;

        }
        this.trigger();
    }
    async setOptionsById(todoId: string) {
        var res = await _.find(this._todos, todo => todo.pollId === todoId)
        if (res) {
            this._options = res.options;

        }
        this.trigger();
    }
    setOptions(options: Option[]) {
        if (options) {
            this._options = [...options]
            this.trigger();
        }

    }
    @autoSubscribe
    getMyTodoById(todoId: string) {
        return _.find(this._myTodos, todo => todo.pollId === todoId);
    }

    @autoSubscribe
    getTodoById(todoId: string) {
        return _.find(this._todos, todo => todo.pollId === todoId);
    }


    deleteMyTodo(todoId: string) {
        this._todos = _.filter(this._todos, todo => todo.pollId !== todoId);

        // Asynchronously delete the todo item from the DB.
        this.trigger();
    }
    deleteTodo(todoId: string) {
        this._todos = _.filter(this._todos, todo => todo.pollId !== todoId);

        // Asynchronously delete the todo item from the DB.
        this.trigger();
    }
}

export default new TodosStore();
