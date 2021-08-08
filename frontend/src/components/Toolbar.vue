<template>
    <v-toolbar class="titlebar" style="background-color:red">
        <v-toolbar-title>
            <v-img src="../assets/logo.png" alt="Passy" title="Passy" class="logo"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <div class="toolbar-button">
                <v-img src="../assets/buttons/menu/minimize-icon.svg" @click="minimize"></v-img>
            </div>
            <div class="toolbar-button">
                <v-img src="../assets/buttons/menu/closeapp-icon.svg" @click="exit"></v-img>
            </div>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
const { BrowserWindow } = require('@electron/remote')

export default ({
    name: 'Toolbar',
    methods: {
        minimize() {
            let w = BrowserWindow.getFocusedWindow();
            w.minimize();
        }, exit() {
            let w = BrowserWindow.getFocusedWindow();
            w.close();
        }
    }
})
</script>

<style>
    .titlebar {
        background-color: red;
    }
    .toolbar-button {
        -webkit-app-region: no-drag;
    }
    .toolbar-button:hover {
        cursor: pointer;
    }
</style>