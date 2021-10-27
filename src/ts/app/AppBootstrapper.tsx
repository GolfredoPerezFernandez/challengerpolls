/**
* AppBootstrapper.tsx
* Copyright: Microsoft 2018
*
* Main entry point for the app, common to both native and web.
*/

import { DbProvider } from 'nosqlprovider';
import * as RX from 'reactxp';
import * as SyncTasks from 'synctasks';

import NavContextStore from '../stores/NavContextStore';
import PageUrlService from '../services/PageUrlService';
import ResponsiveWidthStore from '../stores/ResponsiveWidthStore';
import RootView from '../views/RootView';
import ServiceManager, { Service } from '../services/ServiceManager';
import ServiceRegistrar from '../services/ServiceRegistrar';

import LocalDb from './LocalDb';
import DeepLinkConverter from './DeepLinkConverter';
import AppConfig from './AppConfig';
import TodosStore from '../stores/TodosStore';
import CurrentUserStore from '../stores/CurrentUserStore';
import { Todo } from '../models/TodoModels';

const Moralis = require('moralis');
Moralis.initialize("kVVoRWButUY31vShqdGGQmiya4L0n3kF5aRTUVXk");

Moralis.serverURL = 'https://qqdpez4ourk2.moralishost.com:2053/server'


export default abstract class AppBootstrapper {
    constructor() {
        RX.App.initialize(__DEV__, __DEV__);

        ServiceRegistrar.init();
        // Open the DB and startup any critical services before displaying the UI.
        LocalDb.open(this._getDbProvidersToTry()).then(() => this._startCriticalServices()).then(() => {

            RX.UserInterface.setMainView(this._renderRootView());

            // Convert the initial URL into a navigation context.
            this._getInitialUrl().then(url => {
                if (url) {
                    const context = DeepLinkConverter.getContextFromUrl(url, NavContextStore.isUsingStackNav());
                    if (context) {
                        NavContextStore.setNavContext(context);
                    }
                }
            });
        });
    }


    votesSubscription = async () => {

        const query = new Moralis.Query('Poll');
        let subscription = await query.subscribe()
        subscription.on('update', this.onVoteCreated)
    }
    pollsSubscription = async () => {

        const query = new Moralis.Query('Poll');
        let subscription = await query.subscribe()
        subscription.on('create', this.onPollCreated)
    }


    onPollCreated = async (item: any) => {
        await TodosStore.addTodo(item.attributes.pollId, item.attributes.voted, item.attributes.owners, item.attributes.title, item.attributes.duration, item.attributes.time, item.attributes.openPoll, item.attributes.winner, item.attributes.totalVotes, item.attributes.options, item.attributes.ownerAddress, item.attributes.createdAt);

    }

    onVoteCreated = async (item: any) => {

        let newItem: Todo = {
            pollId: item.attributes.pollId,
            title: item.attributes.title,
            time: item.attributes.time,
            _searchTerms: item.attributes.pollId,
            createdAt: item.attributes.createdAt,
            voted: item.attributes.voted,
            totalVotes: item.attributes.totalVotes,
            openPoll: item.attributes.openPoll,
            winner: item.attributes.winner,
            ownerAddress: item.attributes.ownerAddress,
            options: item.attributes.options,
            duration: item.attributes.duration,
            owners: item.attributes.owners,
        }
        if (item.openPoll == false) {
            await TodosStore.setVote(newItem)

        } else {
            await TodosStore.setPollClosed(newItem)
        }




    }

    private _startCriticalServices(): SyncTasks.Promise<void> {
        const servicesToStart: Service[] = [TodosStore];


        this.pollsSubscription()
        this.votesSubscription()
        CurrentUserStore.setLogin(true)
        if (AppConfig.getPlatformType() === 'web') {
            servicesToStart.push(PageUrlService);
        }

        return ServiceManager.ensureStarted(servicesToStart);
    }

    private _renderRootView() {
        return (
            <RootView
                onLayout={this._onLayoutRootView}
            />
        );
    }

    private _onLayoutRootView = (e: RX.Types.ViewOnLayoutEvent) => {
        const { width, height } = e;
        ResponsiveWidthStore.putWindowSize(width, height);
    };

    // Subclasses must override.
    protected abstract _getDbProvidersToTry(): DbProvider[];
    protected abstract _getInitialUrl(): SyncTasks.Promise<string | undefined>;
}
