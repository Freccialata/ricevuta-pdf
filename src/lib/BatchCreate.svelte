<script lang="ts">
    import { handleTransactionBook, bar_percentage } from "$lib/BatchCreate";

    const handleCsvInput = (event: {
        currentTarget: EventTarget & HTMLFormElement;
    }) =>  {
        const form_input = new FormData(event.currentTarget);
        const file_transazioni = form_input.get("csvFile") as File;
        
        if (file_transazioni.size < 1 || file_transazioni.type != "text/csv") {
            console.warn("Seleziona un file CSV!");
            return
        }
        
        const reader = new FileReader();

        reader.readAsText(file_transazioni as Blob);
        reader.onload = (e) => {
            if (!e.target) {
                console.error(e, "does not have a target");
                return
            }
            const text = e.target.result;
            if (!text) {
                console.error(e, "target does not have result");
                return
            }
            handleTransactionBook(text as string);
        };
    }

</script>

<section>
    <h2>Conversione massiva da CSV a PDF</h2>

    <div>
        <h3>Istruzioni</h3>
        <p>Carica un documento CSV (esportabile da Excel o Google Sheets) con i seguenti dati:</p>
        <table>
            <tr>
                <th>Numero di ricevuta</th>
                <th>Data di rilascio</th>
                <th>Causale</th>
                <th>Importo</th>
                <th>Nome Acquirente</th>
                <th>Canale</th>
                <th>Note aggiuntive</th>
            </tr>
            <tr>
                <td>125</td>
                <td>12/09/2023</td>
                <td>Quota associativa</td>
                <td>10</td>
                <td>Mario Rossi</td>
                <td>Contanti</td>
                <td>...</td>
            </tr>
            <tr>
                <td>126</td>
                <td>13/09/2023</td>
                <td>Viaggio Como Settembre</td>
                <td>15</td>
                <td>Maria Rossella</td>
                <td>Bonifico</td>
                <td></td>
            </tr>
        </table>
        <p>Fai in modo che la prima riga del CSV presenti esattamente le <strong>sette</strong> colonne che vedi.</p>
        <p>Devono essere le prime sette colonne. Se ce ne sono altre dopo, esse verranno ignorate.</p>
        <p>Assicurati anche di selezionare la <strong>virgola (,) come separatore</strong> nel momento dell'esportazione da Excel o G Sheets.</p>
    </div>

    <div class="csv-upload">
        <form method="post" on:submit|preventDefault={handleCsvInput}>
            <input type="file" name="csvFile" id="csvFile" accept=".csv" />
            <br />
            <button type="submit">CSV!</button>
        </form>
    </div>
    <p>
        Tieni presente che il numero di transazioni che hai nel CSV corrisponderà al numero di ricevute PDF che ti ritroverai scaricate nel dispositivo.
        Se hai 5 voci, verranno scaricati 5 file; se hai 800 voci, verranno scaricati 800 file.
    </p>
    <div>
        <h4>Percentuale conversione</h4>
        <span>{$bar_percentage}%</span>
        <div class="loading-bar">
        <div class="l-bar-fill" style="width: {$bar_percentage}%">
        </div>
    </div>
    </div>
</section>  

<style>
    section {
        width: 70%;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    .csv-upload {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {
        margin: 40px auto;
    }

    button, input {
        height: 30px;
    }
    

    button {
        width: 70px;
        background-color: rgb(17, 190, 17);
        border: none;
        border-radius: 2px;
    }

    button:hover {
        background-color: rgb(27, 203, 27);
    }
    button:active {
        background-color: rgb(21, 209, 21);
    }

    .loading-bar {
        display: block;
        width: 40%;
        height: 40px;
        border: solid;
    }

    .l-bar-fill {
        background-color: rgb(21, 209, 21);
        height: inherit;
    }
</style>