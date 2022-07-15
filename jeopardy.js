// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
let NUM_CATEGORIES = 6
let NUM_QUESTIONS_PER_CAT = 5
const catUrl = "https://jservice.io/api/"
let categories = [];


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let res = await axios.get(`${catUrl}categories?count=100`)
        let selectedCats = res.data.map(x => x.id)      
        let catIds = _.sampleSize(selectedCats, NUM_CATEGORIES);
        // console.log(catIds)
        return catIds;       
       
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
//  ${catIds}
async function getCategory(catIds) {
    let res = await axios.get(`${catUrl}category?id=${catIds}`);
    // console.log(res.data.clues);
    let cat = res.data;
    let selectedClues = _.sampleSize(cat.clues, NUM_QUESTIONS_PER_CAT);
    // console.log(selectedClues);
    let clues = selectedClues.map(x => ({
        question: x.question,
        answer: x.answer,
        showing: null
    }));
    // console.log(clues);
    return {title: cat.title, clues} 
    
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    $('#here_table').append(  '<table />' );
    $('#here_table table').attr('id', 'jeopardy')
    $('#here_table table').append('<thead><tr>'+'</tr></thead>')
    $('#here_table table').append('<tbody>'+'</tbody>')
    for(let x=0; x<NUM_CATEGORIES; x++){ 
    $('thead tr').append('<th>' + categories[x].title + '</th>')
        
 }
    // for(let i=0; i < NUM_QUESTIONS_PER_CAT; i++){
    //     $('tbody').append( '<tr>' + '</tr>' );
    // }
    for(let clueIdOf= 0; clueIdOf< NUM_QUESTIONS_PER_CAT; clueIdOf++){
        let $tr = $('<tr>')
    for(let catIDOf=0; catIDOf<NUM_CATEGORIES; catIDOf++){
    $tr.append($(`<td>`).attr('id', `${catIDOf}-${clueIdOf}`).text('?'))
    }
    $('#jeopardy tbody').append($tr)
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    console.log(evt.target)
   let id = evt.target.id;
   let [catid, clueid] = id.split('-')
   let clue = categories[catid].clues[clueid]
   let msg;

   if (!clue.showing) {
     msg = clue.question;
     clue.showing = "question";
   } else if (clue.showing === "question") {
     msg = clue.answer;
     clue.showing = "answer";
   } else {
     return
   }
   $(`#${catid}-${clueid}`).html(msg);
 }


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    $('#jeopardy td th').empty()
    $(".center-fit").css('display', 'block')

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $('#loading').css('display', 'none')

}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {

    let catIDs = await getCategoryIds()
    categories = [];
    for(let id of catIDs){
        categories.push(await getCategory(id))
    }
    fillTable();
}

/** On click of start / restart button, set up game. */

// TODO
$(document).ready($('#start').on('click', setupAndStart));

/** On page load, add event handler for clicking clues */

// TODO
$(document).ready($('#here_table').click(handleClick));