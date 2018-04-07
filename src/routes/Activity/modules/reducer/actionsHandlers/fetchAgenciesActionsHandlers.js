import {Map, Set, List, OrderedSet} from 'immutable';
let handleFetchAgencies = (state, payload) => {
    return state;
};
let handleFetchAgenciesSuccess = (state, payload) => {
    let Agencies = List([]);
    console.log("about to open payload:\n", payload);
    payload.agencies.forEach((agency) => {
        let agencyTemplate = state.get("agencyTemplate");

        agencyTemplate = agencyTemplate.set("Service_Name", agency["Service_Name"]);
        agencyTemplate = agencyTemplate.set("Other_Names", List(agency["Other_Names"]));
        agencyTemplate = agencyTemplate.set("Main_Phone", agency["Main_Phone"]);
        agencyTemplate = agencyTemplate.set("Physical_Site_Address", agency["Physical_Site_Address"]);
        agencyTemplate = agencyTemplate.set("Physical_Site_City", agency["Physical_Site_City"]);
        agencyTemplate = agencyTemplate.set("Physical_Site_State", agency["Physical_Site_State"]);
        agencyTemplate = agencyTemplate.set("Physical_Site_Zip", agency["Physical_Site_Zip"]);
        agencyTemplate = agencyTemplate.set("Web_Address", agency["Web_Address"]);
        agencyTemplate = agencyTemplate.set("Hours_Of_Operation", agency["Hours_Of_Operation"]);
        agencyTemplate = agencyTemplate.set("Description_Of_Service", agency["Description_Of_Service"]);
        agencyTemplate = agencyTemplate.set("Tag", agency["Tag"]);
        agencyTemplate = agencyTemplate.set("Sub_Tag", agency["Sub_Tag"]);
        agencyTemplate = agencyTemplate.set("_id", agency[""]);
        Agencies = Agencies.push(agencyTemplate);
    });

    console.log("agencies: ", Agencies);
    let newState = state.set("agencies", Agencies);

    console.log("newState: ", newState.get("agencies"));

    return newState
};

let handleFetchAgenciesFailure = (state, payload) => {
    return state;
};

export {
    handleFetchAgencies,
    handleFetchAgenciesSuccess,
    handleFetchAgenciesFailure
}
