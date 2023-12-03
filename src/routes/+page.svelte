<script lang="ts">
    import Form from "$lib/Form.svelte";
    import Footer from "$lib/Footer.svelte";
    import BatchCreate from "$lib/BatchCreate.svelte";
</script>

<header>
    <img id="header-logo" src="esn-milano-statale-logo-colour.svg" alt="ESN Milano Statale Logo">
    <h1 class="title">Compila Ricevuta PDF</h1>
</header>

<section id="form-sec">
    <Form/>
</section>
<!-- <section id="preview-sec"></section> -->

<BatchCreate/>

<Footer/>

<style>
    header {
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    #header-logo {
        width: 20ex;
        margin-right: 2.5ex;
    }

    h1.title {
        margin-top: 1.8ex;
        grid-column: 2;
        font-family: "Kelson Sans", "Lato", "Gill Sans", sans-serif;
    }

    #form-sec {
        width: 50%;
        background-color: rgb(184, 206, 206);
        display: flex;
        justify-content: center;
        align-items: center;
        
        /* float: left; */
        /* height: inherit; */
    }
</style>
