#!/usr/bin/env python3
from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False, slow_mo=100)
    page = browser.new_page()
    
    # Capture console messages
    console_logs = []
    def handle_console(msg):
        console_logs.append(f"[{msg.type}] {msg.text}")
    page.on("console", handle_console)
    
    # Capture page errors
    page_errors = []
    def handle_page_error(error):
        page_errors.append(str(error))
    page.on("pageerror", handle_page_error)
    
    print("Navigating to http://localhost:3000/...")
    page.goto('http://localhost:3000/')
    
    # Wait for page to load
    page.wait_for_load_state('networkidle')
    time.sleep(3)
    
    # Get page info
    print(f"\nPage Title: {page.title()}")
    print(f"Page URL: {page.url}")
    
    # Check if root element has content
    root_content = page.locator('#root').inner_html()
    print(f"\nRoot element content length: {len(root_content)}")
    
    if len(root_content) < 100:
        print("WARNING: Root element appears empty or not rendered!")
        print(f"Root content: {root_content[:500]}")
    else:
        print("SUCCESS: Root element has content")
    
    # Print console logs
    print("\n=== Console Logs ===")
    for log in console_logs:
        print(log)
    
    # Print page errors
    if page_errors:
        print("\n=== Page Errors ===")
        for error in page_errors:
            print(error)
    
    # Take screenshot
    page.screenshot(path='E:/HEYRO/HEYRO/debug-screenshot.png', full_page=True)
    print("\nScreenshot saved to debug-screenshot.png")
    
    input("Press Enter to close browser...")
    browser.close()
