var testdata;
var prediction;

function predict(data, weight) {
    var f = 0;
    weight = [3.33346292e-01, -1.11200396e-01, -7.77821806e-01, 1.11058590e-01, 
              3.89430647e-01, 1.99992062e+00, 4.44366975e-01, -2.77951957e-01, 
              -6.00531647e-05, 3.33200243e-01, 2.66644002e+00, 6.66735991e-01, 
              5.55496098e-01, 5.57022408e-02, 2.22225591e-01, -1.66678858e-01];
    for (var j = 0; j < data.length; j++) {
        f += data[j] * weight[j];
    }
    return f > 0 ? 1 : -1;
}

// All the other functions you have for URL checking go here...

// Sample function to use the predictions
function runURLChecks() {
    testdata = [
        isIPInURL(), isLongURL(), isTinyURL(), isAlphaNumericURL(),
        isRedirectingURL(), isHypenURL(), isMultiDomainURL(),
        isFaviconDomainUnidentical(), isIllegalHttpsURL(),
        isImgFromDifferentDomain(), isAnchorFromDifferentDomain(),
        isScLnkFromDifferentDomain(), isFormActionInvalid(),
        isMailToAvailable(), isStatusBarTampered(), isIframePresent()
    ];
    
    prediction = predict(testdata);
    chrome.runtime.sendMessage({ prediction: prediction });
}

// Call the function on page load
window.onload = runURLChecks;
