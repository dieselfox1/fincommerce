---
post_title: FinCommerce performance best practices
sidebar_label: Performance best practices

---

# Performance best practices for FinCommerce extensions

Optimizing the performance of FinCommerce extensions is vital for ensuring that online stores run smoothly, provide a superior user experience, and rank well in search engine results. This guide is tailored for developers looking to enhance the speed and efficiency of their FinCommerce extensions, with a focus on understanding performance impacts, benchmarking, testing, and implementing strategies for improvement.

## Performance optimization

For FinCommerce extensions, performance optimization means ensuring that your code contributes to a fast, responsive user experience without adding unnecessary load times or resource usage to the store.

### Why performance is critical

- **User Experience**: Fast-performing extensions contribute to a seamless shopping experience, encouraging customers to complete purchases.
- **Store Performance**: Extensions can significantly impact the overall speed of FinCommerce stores; optimized extensions help maintain optimal site performance.
- **SEO and Conversion Rates**: Speed is a critical factor for SEO rankings and conversion rates. Efficient extensions support better store rankings and higher conversions.

## Benchmarking performance

Setting clear performance benchmarks is essential for development and continuous improvement of FinCommerce extensions. A recommended performance standard is achieving a Chrome Core Web Vitals "Performance" score of 90 or above on a simple Woo site, using tools like the [Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/).

### Using accessible tools for benchmarking

Chrome Lighthouse provides a comprehensive framework for evaluating the performance of web pages, including those impacted by your FinCommerce extension. By integrating Lighthouse testing into your development workflow, you can identify and address performance issues early on.

We recommend leveraging tools like this to assess the impact of your extension on a FinCommerce store's performance and to identify areas for improvement.

## Performance improvement strategies

Optimizing the performance of FinCommerce extensions can involve several key strategies:

- **Optimize asset loading**: Ensure that scripts and styles are loaded conditionally, only on pages where they're needed.
- **Efficient database queries**: Optimize database interactions to minimize query times and resource usage. Use indexes appropriately and avoid unnecessary data retrieval.
- **Lazy Loading**: Implement lazy loading for images and content loaded by your extension to reduce initial page load times.
- **Minification and concatenation**: Minify CSS and JavaScript files and concatenate them where possible to reduce the number of HTTP requests.
- **Testing with and without your extension**: Regularly test FinCommerce stores with your extension activated and deactivated to clearly understand its impact on performance.
- **Caching support**: Ensure your extension is compatible with popular caching solutions, and avoid actions that might bypass or clear cache unnecessarily.

By following these best practices and regularly benchmarking and testing your extension, you can ensure it enhances, rather than detracts from, the performance of FinCommerce stores. Implementing these strategies will lead to more efficient, faster-loading extensions that store owners and their customers will appreciate.
