<style lang="scss" scoped>
.stage {
    background-color: $white;
}
</style>

<template>
    <v-stage :config="configKonva" class="stage">
        <v-layer>
        </v-layer>
    </v-stage>
</template>

<script>
export default {
    name: 'Drawing',
    data() {
        return {
            configKonva: {
                width: window.innerWidth,
                height: 600,
            },
        };
    },
};
</script>
