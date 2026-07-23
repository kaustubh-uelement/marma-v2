export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl?: string;
  altText?: string;
  metaTitle?: string;
  metaDescription?: string;
}

const fallBackBlog = [
  {
    id: "1",
    slug: "best-healthcare-cybersecurity-solutions",
    title:
      "Healthcare Cybersecurity Solutions: Protecting Patient Data from Modern Cyber Threats",
    metaTitle:
      "Best Healthcare Cybersecurity Solutions to Protect Patient Data",
    metaDescription:
      "Discover how healthcare cybersecurity solutions protect patient data, prevent ransomware attacks, and secure healthcare systems. Learn how Marma Security supports cybersecurity for healthcare organizations.",
    excerpt:
      "Healthcare organizations are facing increasing cyber threats that put sensitive patient information and critical systems at risk. This blog explains how healthcare cybersecurity solutions help protect patient data, prevent ransomware and phishing attacks, and secure healthcare networks. Learn how Marma Security supports healthcare providers with AI-powered cybersecurity solutions designed to strengthen digital protection, improve security readiness, and safeguard modern healthcare environments.",
    altText:
      "Healthcare cybersecurity solutions banner by Marma Security protecting patient data from modern cyber threats.",
    content: `
      <h2>Introduction</h2>
      <p>The healthcare industry is rapidly adopting digital technologies such as EHR, cloud systems, and connected medical devices to improve patient care. However, this digital transformation has also increased cybersecurity challenges like ransomware, phishing, and data breaches.</p>
      <p>Protecting sensitive patient information is now a priority for healthcare organizations. Reliable <a href="/solutions/healthcare">healthcare cybersecurity solutions</a> help secure healthcare systems, reduce cyber risks, and maintain patient trust. Marma Security provides AI-powered cybersecurity protection to help safeguard patient data, networks, and critical digital infrastructure.</p>
      
      <h2>Why Healthcare Organizations Need Advanced Cybersecurity Protection</h2>
      <p>Healthcare providers handle sensitive information, including:</p>
      <ul>
        <li>Patient medical records</li>
        <li>Personal identification details</li>
        <li>Insurance information</li>
        <li>Healthcare applications</li>
        <li>Connected medical devices</li>
      </ul>
      <p>Unlike many other industries, healthcare systems cannot afford long downtime. Any disruption can affect patient services and critical operations.</p>
      <p>Some of the biggest cybersecurity challenges in healthcare include:</p>
      
      <h3>Increasing Healthcare Data Breaches</h3>
      <p>Cybercriminals often target healthcare organizations because patient information can be misused for identity theft, fraud, or financial gain.</p>
      <p>Strong data protection strategies help prevent unauthorized access and keep sensitive healthcare information secure.</p>
      
      <h3>Ransomware Attacks on Healthcare Systems</h3>
      <p>Ransomware remains one of the biggest threats for healthcare providers. Attackers can block access to critical systems and demand payment to restore services.</p>
      <p>Modern healthcare cybersecurity solutions help detect suspicious activity, prevent ransomware attacks, and reduce security risks.</p>
      
      <h3>Phishing and Social Engineering Attacks</h3>
      <p>Healthcare employees are frequent targets of phishing emails designed to steal login credentials or gain access to internal systems.</p>
      <p>Advanced email security and threat detection solutions help identify malicious attempts before they reach users.</p>
      
      <h2>What Are Healthcare Cybersecurity Solutions?</h2>
      <p><a href="/solutions/healthcare">Healthcare Cybersecurity Solutions</a> are security technologies and services designed specifically to protect healthcare environments from cyber threats.</p>
      <p>These solutions help organizations secure:</p>
      <ul>
        <li>Patient data</li>
        <li>Healthcare networks</li>
        <li>Medical systems</li>
        <li>Cloud applications</li>
        <li>Connected devices</li>
      </ul>
      <p>A complete cybersecurity approach combines threat monitoring, data protection, access control, and proactive security management.</p>
      
      <h2>How Marma Security Protects Healthcare Organizations</h2>
      <p>Marma Security provides cybersecurity solutions designed to simplify protection for healthcare businesses while helping them defend against modern cyber threats.</p>
      <p>The platform combines AI-powered security technologies to protect organizations from threats including phishing, ransomware, malware, and unauthorized access.</p>
      
      <h3>AI-Powered Threat Detection</h3>
      <p>Marma Security uses intelligent security technology to identify suspicious activities and detect potential threats before they cause major damage.</p>
      <p>This proactive approach helps healthcare organizations stay protected against constantly changing cyber risks.</p>
      
      <h3>Protection Against Phishing and Ransomware</h3>
      <p>Phishing attacks are one of the most common ways attackers enter healthcare systems.</p>
      <p>Marma’s security solutions help detect and block phishing attempts, malicious activities, and ransomware threats to protect sensitive healthcare information.</p>
      
      <h3>Secure Patient Data and Healthcare Systems</h3>
      <p>Patient data protection is a priority for every healthcare provider.</p>
      <p>Marma Security helps safeguard healthcare environments by providing security across networks, devices, and digital systems, helping organizations reduce exposure to cyber threats.</p>
      
      <h2>Importance of Data Security in Healthcare Industry</h2>
      <p>The importance of data security in healthcare industry continues to increase as organizations depend more on digital technologies.</p>
      <p>Strong healthcare data security helps organizations:</p>
      
      <h3>Maintain Patient Trust</h3>
      <p>Patients expect healthcare providers to protect their personal and medical information. Secure systems help build confidence and trust.</p>
      
      <h3>Improve Business Continuity</h3>
      <p>Cybersecurity protection reduces the chances of operational disruptions caused by cyberattacks.</p>
      
      <h3>Protect Sensitive Healthcare Information</h3>
      <p>Advanced security measures help prevent unauthorized access, data leaks, and privacy risks.</p>
      
      <h3>Support Compliance Requirements</h3>
      <p>Healthcare organizations need strong security practices to maintain compliance with industry regulations and standards.</p>
      
      <h2>Key Healthcare Cybersecurity Solutions Offered by Marma Security</h2>
      <p>Marma Security provides a complete cybersecurity approach designed for modern organizations.</p>
      <p>Key capabilities include:</p>
      
      <h3>Endpoint Protection</h3>
      <p>Helps protect devices from malware, ransomware, and other cyber threats through continuous monitoring and threat prevention.</p>
      
      <h3>Email Security</h3>
      <p>Protects healthcare organizations from phishing emails, scams, and social engineering attacks.</p>
      
      <h3>Cloud Data Protection</h3>
      <p>Helps identify sensitive data exposure and improves control over important business information stored in cloud environments.</p>
      
      <h3>Network Security</h3>
      <p>Provides protection for connected networks and devices to reduce vulnerabilities and improve visibility.</p>
      
      <h2>Why Choose Marma Security for Healthcare Cybersecurity?</h2>
      <p>Choosing the right cybersecurity partner is important because healthcare organizations require specialized protection.</p>
      <p>Marma Security focuses on making enterprise-grade cybersecurity simple and accessible through AI-powered solutions and unified security management.</p>
      <p>Healthcare organizations benefit from:</p>
      <ul>
        <li>Simplified cybersecurity management</li>
        <li>AI-driven threat detection</li>
        <li>Protection against modern cyber threats</li>
        <li>Scalable security solutions</li>
        <li>Improved visibility across digital environments</li>
      </ul>
      
      <h2>How to Choose the Best Healthcare Cybersecurity Companies</h2>
      <p>When comparing the <a href="/solutions/healthcare">best healthcare cybersecurity companies</a>, organizations should evaluate:</p>
      
      <h3>Healthcare Industry Experience</h3>
      <p>The provider should understand healthcare-specific security risks and requirements.</p>
      
      <h3>Complete Security Coverage</h3>
      <p>Look for solutions that protect networks, devices, emails, and sensitive data.</p>
      
      <h3>Proactive Threat Prevention</h3>
      <p>A strong cybersecurity partner should focus on identifying and preventing threats before they become serious problems.</p>
      
      <h3>Easy Deployment and Management</h3>
      <p>Healthcare organizations need security solutions that are effective without creating unnecessary complexity.</p>
      
      <h2>Future of Cybersecurity for Healthcare</h2>
      <p>Cyber threats are continuously evolving. Healthcare organizations need security solutions that can adapt to new attack methods.</p>
      <p>Future healthcare cybersecurity will focus on:</p>
      <ul>
        <li>AI-based threat detection</li>
        <li>Real-time monitoring</li>
        <li>Stronger data protection</li>
        <li>Advanced ransomware prevention</li>
        <li>Smarter security automation</li>
      </ul>
      <p>Organizations that invest in cybersecurity today can create a safer digital healthcare environment for tomorrow.</p>
      
      <h2>Conclusion</h2>
      <p>Healthcare organizations must prioritize cybersecurity to protect patient data, healthcare systems, and digital infrastructure from growing cyber threats. Effective healthcare cybersecurity solutions help prevent data breaches, reduce risks, and maintain patient trust.</p>
      <p><a href="/">Marma Security</a> provides AI-powered cybersecurity solutions that help healthcare organizations protect against phishing, ransomware, and evolving cyber threats. <a href="/contact-us">Contact us today</a> to secure your healthcare environment and protect critical patient data.</p>
      
      <h2>FAQs</h2>
      
      <h3>1. Why is healthcare cybersecurity important?</h3>
      <p>Healthcare cybersecurity protects sensitive patient information, prevents cyberattacks, and helps healthcare organizations maintain secure digital operations.</p>
      
      <h3>2. How do healthcare cybersecurity solutions prevent ransomware attacks?</h3>
      <p>They use threat detection, monitoring, and security controls to identify suspicious activities and block ransomware before it impacts healthcare systems.</p>
      
      <h3>3. What types of healthcare data need cybersecurity protection?</h3>
      <p>Healthcare cybersecurity protects patient records, medical information, healthcare applications, devices, and confidential business data.</p>
      
      <h3>4. Can small healthcare organizations use cybersecurity solutions?</h3>
      <p>Yes, cybersecurity solutions can be scaled based on organization size and security requirements, helping small and large healthcare providers improve protection.</p>
      
      <h3>5. How does Marma Security help healthcare providers?</h3>
      <p>Marma Security helps healthcare providers protect their digital environment with AI-powered security solutions for threat detection, data protection, network security, and cyber risk management.</p>
    `,
    author: "Marma Security",
    date: "July 01, 2026",
    readTime: "5 min read",
    category: "Healthcare",
    imageUrl: "/images/blogs/healthcare-cybersecurity.png",
  },
  {
    id: "2",
    slug: "best-education-cybersecurity-solutions",
    title:
      "Cybersecurity for Educational Institutions: Protecting Schools, Colleges, and Universities from Modern Cyber Threats",
    metaTitle: "Cybersecurity for Educational Institutions | Marma Security",
    metaDescription:
      "Discover how cybersecurity solutions protect educational institutions, student data, campus networks, and research systems from ransomware, phishing, and modern cyber threats using AI-powered security solutions.",
    excerpt:
      "Educational institutions have become one of the fastest-growing targets for cybercriminals due to their large attack surface, valuable student data, research intellectual property, cloud learning environments, and interconnected campus networks. This blog explores the major cybersecurity threats facing educational institutions and how AI-powered cybersecurity solutions help schools, colleges, and universities strengthen cyber resilience.",
    altText:
      "MarmaSecurity Cybersecurity for Educational Institutions banner highlighting student data protection, campus network security, secure learning environments, AI-powered threat detection, and cybersecurity services for schools and universities.",
    content: `
      <h2>Introduction</h2>
      <p>The education sector is experiencing unprecedented digital transformation. Modern educational institutions rely on digital classrooms, cloud computing, learning management systems (LMS), student information systems (SIS), artificial intelligence tools, remote learning platforms, research databases, and connected campus infrastructure.</p>
      <p>While these technologies improve educational experiences and operational efficiency, they also create significant cybersecurity challenges. Educational institutions have become prime targets for cybercriminals because they manage vast amounts of sensitive information while operating highly distributed networks.</p>
      <p>According to recent cybersecurity reports, educational institutions remain among the top sectors targeted by ransomware attacks globally. Cybercriminals exploit vulnerabilities in campus networks, cloud platforms, remote learning environments, and third-party applications to gain access to valuable data.</p>
      <p>As cyber threats continue to evolve, <a href="/solutions/education">implementing comprehensive cybersecurity for educational institutions is no longer optional</a> it's essential for protecting students, faculty, research assets, and institutional reputation.</p>

      <h2>What Are Cybersecurity Solutions for Educational Institutions?</h2>
      <p>Educational cybersecurity solutions are specialized technologies, platforms, and managed services designed to secure educational ecosystems from modern cyber threats.</p>
      <p>These solutions protect:</p>
      <ul>
        <li>Student Information Systems (SIS)</li>
        <li>Learning Management Systems (LMS)</li>
        <li>Campus networks</li>
        <li>Research databases</li>
        <li>Administrative systems</li>
        <li>Faculty and student devices</li>
        <li>Cloud environments</li>
        <li>IoT and smart campus devices</li>
        <li>Identity and access management systems</li>
      </ul>
      <p>A comprehensive educational cybersecurity framework includes:</p>
      <ul>
        <li>AI-powered threat detection</li>
        <li>Endpoint security</li>
        <li>Managed Detection and Response (MDR)</li>
        <li>Cloud security</li>
        <li>Identity protection</li>
        <li>Email security</li>
        <li>Security awareness training</li>
        <li>Incident response</li>
        <li>Zero Trust architecture</li>
        <li>Continuous monitoring</li>
      </ul>

      <h2>Why Educational Institutions Are Prime Targets for Cybercriminals</h2>
      <p>Educational institutions represent attractive targets because they contain:</p>
      <ul>
        <li>Personally identifiable information (PII)</li>
        <li>Financial records</li>
        <li>Medical information</li>
        <li>Academic records</li>
        <li>Intellectual property</li>
        <li>Research data</li>
        <li>Government-funded research projects</li>
      </ul>
      <h3>Key drivers for cybersecurity investment include:</h3>
      <ul>
        <li>Protecting student and faculty information</li>
        <li>Preventing operational disruptions</li>
        <li>Securing research intellectual property</li>
        <li>Maintaining educational continuity</li>
        <li>Meeting regulatory requirements</li>
        <li>Protecting institutional reputation</li>
        <li>Improving cyber resilience</li>
      </ul>

      <h2>Top Cybersecurity Threats Facing Educational Institutions</h2>

      <h3>Ransomware Attacks</h3>
      <p>Ransomware remains the most damaging threat affecting educational institutions.</p>
      <p>Attackers exploit:</p>
      <ul>
        <li>Phishing emails</li>
        <li>Weak passwords</li>
        <li>Remote access vulnerabilities</li>
        <li>Unpatched systems</li>
        <li>Third-party vendors</li>
      </ul>
      <p>Consequences include:</p>
      <ul>
        <li>Campus shutdowns</li>
        <li>Learning disruptions</li>
        <li>Financial losses</li>
        <li>Data theft</li>
        <li>Reputation damage</li>
      </ul>

      <h3>Phishing and Social Engineering</h3>
      <p>Students and faculty are frequent targets of phishing campaigns.</p>
      <p>Common attacks include:</p>
      <ul>
        <li>Credential theft</li>
        <li>Financial scams</li>
        <li>Business email compromise</li>
        <li>Account takeover attacks</li>
      </ul>

      <h3>Student Data Breaches</h3>
      <p>Educational institutions store:</p>
      <ul>
        <li>Student records</li>
        <li>Financial aid information</li>
        <li>Medical records</li>
        <li>Examination results</li>
        <li>Identity information</li>
      </ul>
      <p>Unauthorized access can lead to severe compliance and financial consequences.</p>

      <h3>Insider Threats</h3>
      <p>Threats can originate from:</p>
      <ul>
        <li>Employees</li>
        <li>Students</li>
        <li>Researchers</li>
        <li>Contractors</li>
        <li>Third-party partners</li>
      </ul>

      <h3>Cloud Security Risks</h3>
      <p>Cloud adoption introduces challenges including:</p>
      <ul>
        <li>Misconfigured services</li>
        <li>Identity attacks</li>
        <li>Insecure APIs</li>
        <li>Unauthorized access</li>
      </ul>

      <h2>Student Data Protection and Compliance</h2>
      <p>Educational institutions must protect sensitive information using:</p>
      <table>
        <thead>
          <tr><th>Security Control</th><th>Benefit</th></tr>
        </thead>
        <tbody>
          <tr><td>MFA</td><td>Prevent unauthorized access</td></tr>
          <tr><td>Encryption</td><td>Protect sensitive data</td></tr>
          <tr><td>IAM</td><td>Manage identities</td></tr>
          <tr><td>DLP</td><td>Prevent data leaks</td></tr>
          <tr><td>Monitoring</td><td>Detect threats</td></tr>
          <tr><td>Zero Trust</td><td>Reduce attack surfaces</td></tr>
        </tbody>
      </table>

      <h2>Campus Network and Smart Campus Security</h2>
      <p>Modern campuses include:</p>
      <ul>
        <li>Smart classrooms</li>
        <li>IoT devices</li>
        <li>CCTV systems</li>
        <li>Access control systems</li>
        <li>Research labs</li>
        <li>Wireless networks</li>
        <li>Student devices</li>
      </ul>
      <p>Security measures include:</p>
      <ul>
        <li>Network segmentation</li>
        <li>Endpoint security</li>
        <li>NAC</li>
        <li>SIEM</li>
        <li>Threat detection</li>
        <li>Continuous monitoring</li>
      </ul>

      <h2>Learning Management System (LMS) Security</h2>
      <p>Popular LMS platforms include:</p>
      <ul>
        <li>Moodle</li>
        <li>Blackboard</li>
        <li>Canvas</li>
        <li>Google Classroom</li>
      </ul>
      <p>Security controls should include:</p>
      <ul>
        <li>MFA</li>
        <li>Access control</li>
        <li>API security</li>
        <li>Audit logging</li>
        <li>Data encryption</li>
      </ul>

      <h2>Cloud Learning and Remote Education Security Challenges</h2>
      <p>Major risks include:</p>
      <ul>
        <li>BYOD security</li>
        <li>Remote access</li>
        <li>Shadow IT</li>
        <li>SaaS applications</li>
        <li>Identity theft</li>
        <li>Third-party integrations</li>
      </ul>

      <h2>Supply Chain and Third-Party Cybersecurity Risks</h2>
      <p>Educational institutions depend heavily on:</p>
      <ul>
        <li>Cloud providers</li>
        <li>LMS vendors</li>
        <li>Payment systems</li>
        <li>Research partners</li>
        <li>Software vendors</li>
      </ul>
      <p>Risk mitigation strategies include:</p>
      <ul>
        <li>Vendor assessments</li>
        <li>Security audits</li>
        <li>Continuous monitoring</li>
        <li>Access controls</li>
      </ul>

      <h2>How Marma Security Protects Educational Institutions</h2>

      <h3>AI-Powered Threat Detection</h3>
      <ul>
        <li>Machine learning</li>
        <li>Behavioral analytics</li>
        <li>Threat intelligence</li>
      </ul>

      <h3><a href="/solutions/managed-detection-response">Managed Detection & Response</a></h3>
      <ul>
        <li>24/7 monitoring</li>
        <li>Threat hunting</li>
        <li>Incident response</li>
      </ul>

      <h3>Endpoint Security</h3>
      <ul>
        <li>Device protection</li>
        <li>EDR/XDR</li>
        <li>Malware prevention</li>
      </ul>

      <h3>Cloud Security</h3>
      <ul>
        <li>SaaS security</li>
        <li>Multi-cloud visibility</li>
        <li>Identity protection</li>
      </ul>

      <h3>Zero Trust Architecture</h3>
      <ul>
        <li>Identity verification</li>
        <li>Least privilege</li>
        <li>Continuous monitoring</li>
      </ul>

      <h3>Security Awareness Training</h3>
      <ul>
        <li>Student awareness</li>
        <li>Faculty training</li>
        <li>Phishing simulations</li>
      </ul>

      <h2>Benefits of Educational Cybersecurity Solutions</h2>
      <ul>
        <li>✅ Reduced ransomware risk</li>
        <li>✅ Improved cyber resilience</li>
        <li>✅ Better compliance</li>
        <li>✅ Stronger data protection</li>
        <li>✅ Enhanced visibility</li>
        <li>✅ Reduced downtime</li>
        <li>✅ Protected research assets</li>
        <li>✅ Increased stakeholder trust</li>
        <li>✅ Improved business continuity</li>
      </ul>

      <h2>Future of Education Cybersecurity</h2>
      <p>Emerging technologies include:</p>
      <ul>
        <li>AI-powered SOC</li>
        <li>Extended Detection and Response (XDR)</li>
        <li>Predictive analytics</li>
        <li>Autonomous response</li>
        <li>Zero Trust</li>
        <li>Identity-first security</li>
        <li>Behavioral AI</li>
      </ul>

      <h2>Why Choose Marma Security</h2>
      <p>Marma Security delivers:</p>
      <ul>
        <li>AI-driven threat detection</li>
        <li>MDR services</li>
        <li>Endpoint protection</li>
        <li>Cloud security</li>
        <li>Identity protection</li>
        <li>Zero Trust implementation</li>
        <li>Security awareness</li>
        <li>24/7 monitoring</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Educational institutions face increasingly sophisticated cyber threats, making AI-powered cybersecurity solutions essential for protecting students, faculty, research environments, and critical educational infrastructure while ensuring business continuity and long-term cyber resilience. Similar challenges exist across other critical sectors as well.</p>
      <p><a href="/blogs/best-healthcare-cybersecurity-solutions">Explore our guide on Healthcare Cybersecurity Solutions</a> to learn how healthcare organizations protect sensitive patient data, medical systems, and critical healthcare infrastructure from evolving cyber threats.</p>

      <h2>FAQs</h2>

      <h3>Why is cybersecurity important for educational institutions?</h3>
      <p>Cybersecurity protects student data, research systems, campus networks, and educational operations from cyberattacks.</p>

      <h3>What are the biggest cybersecurity threats facing educational institutions?</h3>
      <p>Ransomware, phishing, insider threats, cloud attacks, and data breaches remain major risks.</p>

      <h3>How can universities protect student data?</h3>
      <p>By implementing MFA, encryption, Zero Trust, endpoint security, and continuous monitoring.</p>

      <h3>What is Zero Trust security?</h3>
      <p>Zero Trust continuously verifies identities and restricts access using least-privilege principles.</p>

      <h3>How does Marma Security help educational institutions?</h3>
      <p>Marma Security provides AI-powered threat detection, MDR, endpoint protection, cloud security, and Zero Trust solutions.</p>
    `,
    author: "Marma Security",
    date: "July 02, 2026",
    readTime: "8 min read",
    category: "Education",
    imageUrl: "/images/blogs/education-cybersecurity.png",
  },
];

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;
    console.log(apiUrl);
    console.log(tenantSlug);

    if (!tenantSlug) {
      console.warn("Missing NEXT_PUBLIC_TENANT_SLUG in env");
      return fallBackBlog;
    }

    const res = await fetch(`${apiUrl}/api/v1/blog/active`, {
      headers: {
        "x-tenant-slug": tenantSlug,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
      return fallBackBlog;
    }

    const json = await res.json();
    const data = Array.isArray(json) ? json : json.data || [];
    console.log("data here", json);

    if (data.length === 0) {
      return fallBackBlog;
    }

    return data.map(mapBackendToBlog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return fallBackBlog;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const tenantSlug = process.env.NEXT_PUBLIC_TENANT_SLUG;

    if (!tenantSlug) {
      return fallBackBlog.find((blog) => blog.slug === slug) || null;
    }

    const res = await fetch(`${apiUrl}/api/v1/blog/slug/${slug}`, {
      headers: {
        "x-tenant-slug": tenantSlug,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return fallBackBlog.find((blog) => blog.slug === slug) || null;
    }

    const json = await res.json();
    const data = json.data || json;

    if (!data || !data.id)
      return fallBackBlog.find((blog) => blog.slug === slug) || null;

    return mapBackendToBlog(data);
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return fallBackBlog.find((blog) => blog.slug === slug) || null;
  }
}

function mapBackendToBlog(backendBlog: any): BlogPost {
  // Format date nicely
  let formattedDate = backendBlog.published_at || new Date().toISOString();
  try {
    const dateObj = new Date(formattedDate);
    formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  } catch (e) {
    // keep original string if invalid
  }

  return {
    id: backendBlog.id,
    slug: backendBlog.slug,
    title: backendBlog.title || "",
    excerpt: backendBlog.excerpt || "",
    content: backendBlog.content || "",
    author: backendBlog.author_name || "Admin",
    date: formattedDate,
    readTime: backendBlog.reading_time || "5 min read",
    category:
      backendBlog.tags && backendBlog.tags.length > 0
        ? backendBlog.tags[0]
        : "General",
    imageUrl: backendBlog.cover_image_url || undefined,
    altText: backendBlog.title || "Blog image",
    metaTitle: backendBlog.seo?.title || backendBlog.title || undefined,
    metaDescription:
      backendBlog.seo?.description || backendBlog.excerpt || undefined,
  };
}
