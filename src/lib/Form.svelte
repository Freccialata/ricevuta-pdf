<script lang="ts">
    import { hadleGenerate } from "$lib/pdfme";

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    const handleForm = (event: {
        currentTarget: EventTarget & HTMLFormElement;
    }) => {
        const form_ricevuta = new FormData(event.currentTarget);

        const dati_ricevuta = {
            anno_fiscale: form_ricevuta.get("anno_fiscale"),
            numero_ricevuta: form_ricevuta.get("numero_ricevuta"),
            data_rilascio: form_ricevuta.get("data_rilascio"),
            causale: form_ricevuta.get("causale"),
            ricevuti_da: form_ricevuta.get("ricevuti_da"),
            importo: form_ricevuta.get("importo"),
            canale: form_ricevuta.get("canale"),
            note_aggiuntive: form_ricevuta.get("note_aggiuntive"),
        };
        hadleGenerate(dati_ricevuta as any);
    };
</script>

    <form on:submit|preventDefault={handleForm} method="post">
        <label class="labl-col1" for="anno_fiscale">Anno fiscale</label>
        <input
            class="input-col2"
            type="text"
            name="anno_fiscale"
            id="anno_fiscale"
            placeholder="Anno fiscale"
            value={currentYear}
            required
        />
        <label class="labl-col1" for="numero_ricevuta">Numero di ricevuta</label
        >
        <input
            class="input-col2"
            type="number"
            min="1"
            name="numero_ricevuta"
            id="numero_ricevuta"
            placeholder="Numero di ricevuta"
        />
        <label class="labl-col1" for="data_rilascio">Data di rilascio</label>
        <input
            class="input-col2"
            type="date"
            name="data_rilascio"
            id="data_rilascio"
            value={currentDate.toISOString().slice(0, 10)}
            required
        />
        <label class="labl-col1" for="causale">Causale</label>
        <input
            class="input-col2"
            type="text"
            name="causale"
            id="causale"
            maxlength="30"
            placeholder="Causale (max 30 caratteri)"
            required
        />
        <label class="labl-col1" for="ricevuti_da">Nome Acquirente</label>
        <input
            class="input-col2"
            type="text"
            name="ricevuti_da"
            id="ricevuti_da"
            placeholder="Nome Acquirente"
            required
        />
        <label class="labl-col1" for="importo">Importo</label>
        <input
            class="input-col2"
            type="number"
            name="importo"
            placeholder="Importo"
            min="0.01"
            step=".01"
            required
        />
        <label class="labl-col1" for="canale">Canale</label>
        <select class="input-col2" name="canale" required>
            <option value="contanti">Contanti</option>
            <option value="bonifico">Bonifico</option>
        </select>
        <label class="labl-col1" for="note_aggiuntive">Note aggiuntive</label>
        <textarea
            class="input-col2"
            name="note_aggiuntive"
            id="note_aggiuntive"
            cols="50"
            rows="2"
            placeholder="Note aggiuntive"
        ></textarea>
        <button type="submit" class="btn-dwl labl-col1">Download</button>
        <button type="reset" class="labl-col1" id="clear-btn">Pulisci </button>
    </form>

<style>
    .btn-dwl {
        padding: 15px 0px;
        background-color: rgb(17, 190, 17);
        font-weight: bold;
        font-size: larger;
        border: none;
        border-radius: 6px;
    }
    .btn-dwl:hover {
        background-color: rgb(80, 199, 80);
    }
    .btn-dwl:active {
        background-color: rgb(10, 129, 10);
    }

    form {
        margin: 20px 10px;
        display: grid;
        row-gap: 10px;
    }

    .labl-col1 {
        grid-column: 1;
        align-self: center;
        width: 9em;
    }

    .input-col2 {
        height: 35px;
        grid-column: 2;
        border-radius: 5px;
        font-family: inherit;
        font-size: inherit;
        background-color: #fff;
        border: 2px solid #8b8a8b;
        border-radius: 4px;
    }
</style>
