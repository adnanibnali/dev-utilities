document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded and DOM is ready");

  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Tab clicked:", button.getAttribute("data-tab")); // Debug log

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);
      if (tabContent) {
        tabContent.classList.add("active");
        // Trigger recalculation for the active tab
        triggerActiveTabCalculation(tabId);
      } else {
        console.error("Tab content not found for id:", tabId); // Debug log
      }
    });
  });

  // Function to trigger calculation for the active tab
  function triggerActiveTabCalculation(tabId) {
    console.log("Triggering calculation for tab:", tabId); // Debug log

    switch (tabId) {
      case "px-to-rem":
        if (pxInput.value) {
          const event = new Event("input");
          pxInput.dispatchEvent(event);
        }
        break;
      case "rem-to-px":
        if (remInput.value) {
          const event = new Event("input");
          remInput.dispatchEvent(event);
        }
        break;
      case "px-to-tw":
        if (pxTwInput.value) {
          const event = new Event("input");
          pxTwInput.dispatchEvent(event);
        }
        break;
      case "tw-to-px":
        if (twInput.value) {
          const event = new Event("input");
          twInput.dispatchEvent(event);
        }
        break;
    }
  }

  // Get DOM elements
  const pxInput = document.getElementById("px-input");
  const remOutput = document.getElementById("rem-output");
  const remInput = document.getElementById("rem-input");
  const pxOutput = document.getElementById("px-output");
  const pxTwInput = document.getElementById("px-tw-input");
  const twOutput = document.getElementById("tw-output");
  const twInput = document.getElementById("tw-input");
  const pxTwOutput = document.getElementById("px-tw-output");
  const baseFontSizeInput = document.getElementById("base-font-size");

  // Log if any elements are not found
  [
    { name: "pxInput", el: pxInput },
    { name: "remOutput", el: remOutput },
    { name: "remInput", el: remInput },
    { name: "pxOutput", el: pxOutput },
    { name: "pxTwInput", el: pxTwInput },
    { name: "twOutput", el: twOutput },
    { name: "twInput", el: twInput },
    { name: "pxTwOutput", el: pxTwOutput },
    { name: "baseFontSizeInput", el: baseFontSizeInput },
  ].forEach((item) => {
    if (!item.el) {
      console.error(`Element not found: ${item.name}`);
    }
  });

  // Conversion functions
  function pxToRem(px, baseSize) {
    if (isNaN(px) || isNaN(baseSize) || baseSize <= 0) {
      return "";
    }
    return (px / baseSize).toFixed(4);
  }

  function remToPx(rem, baseSize) {
    if (isNaN(rem) || isNaN(baseSize) || baseSize <= 0) {
      return "";
    }
    return (rem * baseSize).toFixed(2);
  }

  function pxToTailwind(px) {
    if (isNaN(px)) {
      return "";
    }
    return (px / 4).toFixed(2);
  }

  function tailwindToPx(tw) {
    if (isNaN(tw)) {
      return "";
    }
    return (tw * 4).toFixed(2);
  }

  // Event listeners for inputs
  pxInput?.addEventListener("input", () => {
    console.log("px to rem input event"); // Debug log
    const px = parseFloat(pxInput.value);
    const baseSize = parseFloat(baseFontSizeInput.value) || 16;

    if (pxInput.value === "") {
      remOutput.value = "";
      return;
    }

    if (!isNaN(px)) {
      remOutput.value = pxToRem(px, baseSize);
      highlightOutput(remOutput);
    } else {
      remOutput.value = "";
    }
  });

  remInput?.addEventListener("input", () => {
    console.log("rem to px input event"); // Debug log
    const rem = parseFloat(remInput.value);
    const baseSize = parseFloat(baseFontSizeInput.value) || 16;

    if (remInput.value === "") {
      pxOutput.value = "";
      return;
    }

    if (!isNaN(rem)) {
      pxOutput.value = remToPx(rem, baseSize);
      highlightOutput(pxOutput);
    } else {
      pxOutput.value = "";
    }
  });

  pxTwInput?.addEventListener("input", () => {
    console.log("px to tw input event"); // Debug log
    const px = parseFloat(pxTwInput.value);

    if (pxTwInput.value === "") {
      twOutput.value = "";
      return;
    }

    if (!isNaN(px)) {
      twOutput.value = pxToTailwind(px);
      highlightOutput(twOutput);
    } else {
      twOutput.value = "";
    }
  });

  twInput?.addEventListener("input", () => {
    console.log("tw to px input event"); // Debug log
    const tw = parseFloat(twInput.value);

    if (twInput.value === "") {
      pxTwOutput.value = "";
      return;
    }

    if (!isNaN(tw)) {
      pxTwOutput.value = tailwindToPx(tw);
      highlightOutput(pxTwOutput);
    } else {
      pxTwOutput.value = "";
    }
  });

  // Update conversions when base font size changes
  baseFontSizeInput?.addEventListener("input", () => {
    console.log("Base font size changed"); // Debug log
    // Ensure base font size is valid
    const baseSize = parseFloat(baseFontSizeInput.value);
    if (isNaN(baseSize) || baseSize <= 0) {
      baseFontSizeInput.value = 16; // Reset to default if invalid
    }

    // Get the active tab
    const activeTab = document
      .querySelector(".tab-btn.active")
      ?.getAttribute("data-tab");
    if (activeTab) {
      // Trigger recalculation for the active tab
      triggerActiveTabCalculation(activeTab);
    }
  });

  // Function to highlight output briefly
  function highlightOutput(element) {
    if (!element) return;
    element.style.transition = "background-color 0.3s ease";
    element.style.backgroundColor = "rgba(99, 102, 241, 0.3)";

    setTimeout(() => {
      element.style.backgroundColor = "";
    }, 300);
  }

  // Initialize all converters
  function initializeConverters() {
    console.log("Initializing converters"); // Debug log

    // Set default base font size
    if (baseFontSizeInput) {
      baseFontSizeInput.value = 16;
    }

    // Initialize all input fields with default values
    if (pxInput) pxInput.value = 16;
    if (remInput) remInput.value = 1;
    if (pxTwInput) pxTwInput.value = 16;
    if (twInput) twInput.value = 4;

    // Calculate initial values for all converters
    const baseSize = 16;

    // Initialize px to rem
    if (remOutput && pxInput) {
      remOutput.value = pxToRem(parseFloat(pxInput.value), baseSize);
    }

    // Initialize rem to px
    if (pxOutput && remInput) {
      pxOutput.value = remToPx(parseFloat(remInput.value), baseSize);
    }

    // Initialize px to Tailwind
    if (twOutput && pxTwInput) {
      twOutput.value = pxToTailwind(parseFloat(pxTwInput.value));
    }

    // Initialize Tailwind to px
    if (pxTwOutput && twInput) {
      pxTwOutput.value = tailwindToPx(parseFloat(twInput.value));
    }

    // Make sure the active tab has its calculation highlighted
    const activeTab = document
      .querySelector(".tab-btn.active")
      ?.getAttribute("data-tab");
    if (activeTab) {
      switch (activeTab) {
        case "px-to-rem":
          if (remOutput) highlightOutput(remOutput);
          break;
        case "rem-to-px":
          if (pxOutput) highlightOutput(pxOutput);
          break;
        case "px-to-tw":
          if (twOutput) highlightOutput(twOutput);
          break;
        case "tw-to-px":
          if (pxTwOutput) highlightOutput(pxTwOutput);
          break;
      }
    }
  }

  // Run initialization
  initializeConverters();

  // Percentage Calculator
  const percentX = document.getElementById("percent-x");
  const valueY = document.getElementById("value-y");
  const percentResult = document.getElementById("percent-result");

  const valueX = document.getElementById("value-x");
  const totalY = document.getElementById("total-y");
  const percentOfTotal = document.getElementById("percent-of-total");

  // Log if any percentage calculator elements are not found
  [
    { name: "percentX", el: percentX },
    { name: "valueY", el: valueY },
    { name: "percentResult", el: percentResult },
    { name: "valueX", el: valueX },
    { name: "totalY", el: totalY },
    { name: "percentOfTotal", el: percentOfTotal },
  ].forEach((item) => {
    if (!item.el) {
      console.error(`Percentage calculator element not found: ${item.name}`);
    }
  });

  // Calculate X% of Y
  function calculatePercentage() {
    console.log("Calculating X% of Y"); // Debug log

    if (!percentX || !valueY || !percentResult) {
      console.error("Missing elements for X% of Y calculation");
      return;
    }

    const x = parseFloat(percentX.value);
    const y = parseFloat(valueY.value);

    console.log("Values:", { x, y });

    if (percentX.value === "" || valueY.value === "") {
      percentResult.value = "";
      return;
    }

    if (!isNaN(x) && !isNaN(y)) {
      const result = (x / 100) * y;
      percentResult.value = result.toFixed(2);
      console.log("Result:", result.toFixed(2));
      highlightOutput(percentResult);
    } else {
      percentResult.value = "";
    }
  }

  // Calculate what percentage X is of Y
  function calculatePercentOfTotal() {
    console.log("Calculating what percentage X is of Y"); // Debug log

    if (!valueX || !totalY || !percentOfTotal) {
      console.error("Missing elements for percentage of total calculation");
      return;
    }

    const x = parseFloat(valueX.value);
    const y = parseFloat(totalY.value);

    console.log("Values:", { x, y });

    if (valueX.value === "" || totalY.value === "") {
      percentOfTotal.value = "";
      return;
    }

    if (!isNaN(x) && !isNaN(y)) {
      if (y === 0) {
        percentOfTotal.value = "Cannot divide by zero";
        return;
      }
      const result = (x / y) * 100;
      percentOfTotal.value = result.toFixed(2) + "%";
      console.log("Result:", result.toFixed(2) + "%");
      highlightOutput(percentOfTotal);
    } else {
      percentOfTotal.value = "";
    }
  }

  // Event listeners for percentage calculator
  percentX?.addEventListener("input", calculatePercentage);
  valueY?.addEventListener("input", calculatePercentage);

  valueX?.addEventListener("input", calculatePercentOfTotal);
  totalY?.addEventListener("input", calculatePercentOfTotal);

  // Initialize percentage calculator with demo values
  function initializePercentageCalculator() {
    console.log("Initializing percentage calculator");

    if (percentX && valueY && valueX && totalY) {
      // Initialize X% of Y calculator
      percentX.value = "20";
      valueY.value = "150";
      calculatePercentage();

      // Initialize X is what % of Y calculator
      valueX.value = "30";
      totalY.value = "200";
      calculatePercentOfTotal();
    } else {
      console.error(
        "Could not initialize percentage calculator - missing elements"
      );
    }
  }

  // Run percentage calculator initialization with a small delay
  setTimeout(initializePercentageCalculator, 500);

  // Color Picker Functionality
  const colorPicker = document.getElementById("colorPicker");
  const colorPreview = document.getElementById("colorPreview");
  const hexCode = document.getElementById("hexCode");
  const rgbCode = document.getElementById("rgbCode");
  const rgbaCode = document.getElementById("rgbaCode");
  const hslCode = document.getElementById("hslCode");
  const opacitySlider = document.getElementById("opacitySlider");
  const opacityInput = document.getElementById("opacityInput");

  // Update all color codes and preview
  function updateColorCodes(color, opacity = 100) {
    // Convert color to different formats
    const hex = color;
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const alpha = opacity / 100;

    // Update display elements
    hexCode.textContent = hex;
    rgbCode.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    rgbaCode.textContent = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(
      2
    )})`;
    hslCode.textContent = `hsl(${Math.round(hsl.h)}, ${Math.round(
      hsl.s
    )}%, ${Math.round(hsl.l)}%)`;
    colorPreview.style.backgroundColor = rgbaCode.textContent;
  }

  // Convert hex to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  // Convert RGB to HSL
  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return {
      h: h * 360,
      s: s * 100,
      l: l * 100,
    };
  }

  // Event listeners
  colorPicker.addEventListener("input", (e) => {
    updateColorCodes(e.target.value, parseInt(opacitySlider.value));
  });

  // Opacity controls
  opacitySlider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value);
    opacityInput.value = value;
    updateColorCodes(colorPicker.value, value);
  });

  opacityInput.addEventListener("input", (e) => {
    let value = parseInt(e.target.value);

    // Clamp value between 0 and 100
    if (isNaN(value)) value = 100;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    opacitySlider.value = value;
    e.target.value = value;
    updateColorCodes(colorPicker.value, value);
  });

  // Copy color codes
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const codeType = btn.dataset.code;
      let textToCopy;

      switch (codeType) {
        case "hex":
          textToCopy = hexCode.textContent;
          break;
        case "rgb":
          textToCopy = rgbCode.textContent;
          break;
        case "rgba":
          textToCopy = rgbaCode.textContent;
          break;
        case "hsl":
          textToCopy = hslCode.textContent;
          break;
      }

      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show feedback
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = originalIcon;
        }, 1000);
      });
    });
  });

  // Initialize with default color
  updateColorCodes(colorPicker.value);
});
