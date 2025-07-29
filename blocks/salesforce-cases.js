/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.classList.add('container');

  const endpointDom = block.querySelector('a');

  if(endpointDom) {
    const endpoint = endpointDom.href;

    if(endpoint) {
      const resp = await fetch(endpoint);

      if (resp.ok) {
        const cases = await resp.json();

        const casesRow = document.createElement('div');
        casesRow.classList.add('row');
  
        block.append(casesRow);
  
        cases.value.forEach((caseObj) => {
          const sfdc_case = document.createElement('div');
          sfdc_case.classList.add('col-6', 'col-md-4','gx-2');

          sfdc_case.innerHTML = `          
            <div class="card">
              <div class="card-body">
                <h5 class="card-title p-2 text-black">
                  <a href="https://adobe.lightning.force.com/lightning/r/Case/${caseObj.Id}/view" class="text-decoration-none">
                    ${caseObj.Subject}
                  </a>
                </h5>
                <p class="card-text fs-6 fw-light text-black">case #: ${caseObj.CaseNumber}</p>
                <p class="card-text fs-6 fw-light text-black">${caseObj.Reason_for_Support_Request__c}</p>
              </div>
            </div>
          </a>
          `;
  
          casesRow.append(sfdc_case);
        });
      }
    }
  }
}